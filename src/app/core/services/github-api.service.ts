import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, catchError, map, timer, switchMap } from 'rxjs';

export interface RepoStats {
  stars: number;
  updatedAt: string;
  primaryLanguage: string;
  description: string | null;
}

const CACHE_KEY = 'github_repo_stats';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const GITHUB_API_BASE = 'https://api.github.com';

const PUBLIC_REPOS = [
  'Mani-Logix-B2B',
  'AI-Powered-Task-Manager',
  'Two-Factor-Authentication-System',
] as const;

@Injectable({ providedIn: 'root' })
export class GitHubApiService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private cache = new Map<string, { data: RepoStats; timestamp: number }>();

  constructor() {
    if (this.isBrowser) {
      this.loadCache();
    }
  }

  private loadCache(): void {
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([key, value]) => {
          if (Date.now() - (value as any).timestamp < CACHE_TTL) {
            this.cache.set(key, value as any);
          }
        });
      }
    } catch {
      // Ignore cache errors
    }
  }

  private saveCache(): void {
    if (!this.isBrowser) return;
    try {
      const obj: Record<string, any> = {};
      this.cache.forEach((value, key) => {
        obj[key] = value;
      });
      localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch {
      // Ignore cache errors
    }
  }

  fetchRepoStats(owner: string, repo: string): Observable<RepoStats | null> {
    const cacheKey = `${owner}/${repo}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return of(cached.data);
    }

    return this.http.get<{ stargazers_count: number; updated_at: string; language: string; description: string | null }>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    ).pipe(
      map((res) => ({
        stars: res.stargazers_count,
        updatedAt: res.updated_at,
        primaryLanguage: res.language || 'Unknown',
        description: res.description,
      })),
      catchError(() => of(null)),
      map((data) => {
        if (data) {
          this.cache.set(cacheKey, { data, timestamp: Date.now() });
          this.saveCache();
        }
        return data;
      })
    );
  }

  fetchAllPublicReposStats(owner: string): Observable<Record<string, RepoStats | null>> {
    const observables = PUBLIC_REPOS.map((repo) =>
      this.fetchRepoStats(owner, repo).pipe(
        map((stats) => ({ repo, stats })),
        catchError(() => of({ repo, stats: null }))
      )
    );

    return timer(0).pipe(
      switchMap(() => {
        // Fire all requests in parallel with a small stagger to avoid rate limiting
        return new Observable<Record<string, RepoStats | null>>((subscriber) => {
          const results: Record<string, RepoStats | null> = {};
          let completed = 0;

          PUBLIC_REPOS.forEach((repo, index) => {
            setTimeout(() => {
              this.fetchRepoStats(owner, repo).subscribe({
                next: (stats) => {
                  results[repo] = stats;
                  completed++;
                  if (completed === PUBLIC_REPOS.length) {
                    subscriber.next(results);
                    subscriber.complete();
                  }
                },
                error: () => {
                  results[repo] = null;
                  completed++;
                  if (completed === PUBLIC_REPOS.length) {
                    subscriber.next(results);
                    subscriber.complete();
                  }
                },
              });
            }, index * 100);
          });
        });
      })
    );
  }

  clearCache(): void {
    this.cache.clear();
    if (this.isBrowser) {
      localStorage.removeItem(CACHE_KEY);
    }
  }
}