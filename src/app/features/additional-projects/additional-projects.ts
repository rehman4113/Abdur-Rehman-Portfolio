import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Github, ExternalLink, Code, Server, Database, Lock, Key, Network, Brain, Zap, GitBranch, Send, FileCode, CheckCircle, XCircle, AlertTriangle, Info, ChevronRight } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { CardComponent } from '../../shared/components/ui/card/card';
import { BadgeComponent } from '../../shared/components/ui/badge/badge';
import { ImageSlotComponent } from '../../shared/components/ui/image-slot/image-slot';
import { ButtonComponent } from '../../shared/components/ui/button/button';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';
import { projectsData } from '../../core/data/projects.data';
import { GitHubApiService, RepoStats } from '../../core/services/github-api.service';

@Component({
  selector: 'feature-additional-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SectionHeaderComponent, CardComponent, BadgeComponent, ImageSlotComponent, ButtonComponent, ScrollRevealDirective],
  template: `
    <section class="section bg-dark-50" aria-labelledby="projects-title">
      <div class="container-custom">
        <ui-section-header
          title="Additional Projects"
          subtitle="Independent backend projects — from authentication to microservices"
          description="Each project represents a stepping stone in my backend engineering journey."
        />

        <div class="grid md:grid-cols-2 gap-6" role="list">
          @for (project of additionalProjects(); track project.id; let i = $index) {
            <article class="card-hover" role="listitem" scrollReveal [delay]="i * 100">
              <div class="relative aspect-video overflow-hidden">
                <ui-image-slot
                  [src]="project.image"
                  [alt]="project.title + ' screenshot'"
                  aspectRatio="16:9"
                  radius="xl"
                  [loading]="'lazy'"
                  [placeholderText]="project.image ? '' : 'No screenshot available'"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-dark-1000/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  @if (project.githubUrl) {
                    <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="p-3 rounded-xl bg-white text-dark-900 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-105" aria-label="View {{ project.title }} on GitHub">
                      <lucide-angular [img]="Github" [size]="20" strokeWidth="2"></lucide-angular>
                    </a>
                  } @else {
                    <button class="p-3 rounded-xl bg-white/10 text-dark-400 cursor-not-allowed" aria-label="Private repository">
                      <lucide-angular [img]="Lock" [size]="20" strokeWidth="2"></lucide-angular>
                    </button>
                  }
                </div>
              </div>

              <div class="p-6 space-y-4">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <h3 class="font-display font-semibold text-heading-md text-dark-1000 mb-1">{{ project.title }}</h3>
                    <div class="flex items-center gap-2 text-sm text-dark-500">
                      <span class="px-2 py-0.5 rounded bg-dark-100 font-mono">{{ project.startDate }} – {{ project.endDate }}</span>
                    </div>
                  </div>
                  @if (project.featured) {
                    <ui-badge variant="accent" size="sm" [dot]="true">Featured</ui-badge>
                  }
                </div>

                <p class="text-dark-500 text-body-sm leading-relaxed">{{ project.description }}</p>

                <div class="flex flex-wrap gap-2" role="list" aria-label="Tech stack">
                  @for (tech of project.techStack; track tech) {
                    <ui-badge variant="outline" size="sm" role="listitem">{{ tech }}</ui-badge>
                  }
                </div>

                @if (project.corrections && project.corrections.length > 0) {
                  <div class="pt-3 border-t border-dark-200">
                    <p class="text-xs text-accent-600 font-medium mb-2 flex items-center gap-1">
                      <lucide-angular [img]="AlertTriangle" [size]="12" strokeWidth="2"></lucide-angular>
                      Corrections from old portfolio:
                    </p>
                    <ul class="space-y-1" role="list">
                      @for (correction of project.corrections; track correction) {
                        <li class="flex items-start gap-2 text-xs text-dark-500">
                          <lucide-angular [img]="CheckCircle" [size]="12" strokeWidth="2" class="text-primary-500 flex-shrink-0 mt-0.5"></lucide-angular>
                          <span>{{ correction }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                }

                @if (githubStats()(project.id); as stats) {
                  <div class="pt-3 border-t border-dark-200 flex items-center gap-4 text-xs text-dark-500">
                    <span class="flex items-center gap-1">
                      <lucide-angular [img]="GitBranch" [size]="12" strokeWidth="2"></lucide-angular>
                      {{ stats.primaryLanguage }}
                    </span>
                    <span class="flex items-center gap-1">
                      <lucide-angular [img]="Code" [size]="12" strokeWidth="2"></lucide-angular>
                      {{ stats.stars }} stars
                    </span>
                    <span class="flex items-center gap-1">
                      <lucide-angular [img]="Send" [size]="12" strokeWidth="2"></lucide-angular>
                      Updated {{ formatDate(stats.updatedAt) }}
                    </span>
                  </div>
                }

                <div class="flex items-center gap-3 pt-3">
                  @if (project.githubUrl) {
                    <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="flex-1">
                      <ui-button variant="secondary" size="sm" [fullWidth]="true" label="View Code" [iconLeft]="Github" />
                    </a>
                  } @else {
                    <ui-button variant="ghost" size="sm" [fullWidth]="true" label="Private Repo" [iconLeft]="Lock" [disabled]="true" />
                  }
                  @if (project.liveUrl) {
                    <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer">
                      <ui-button variant="ghost" size="sm" label="Live Demo" [iconRight]="ExternalLink" />
                    </a>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        <div class="mt-12 text-center" scrollReveal [delay]="additionalProjects().length * 100">
          <p class="text-dark-500 text-body mb-6">
            All projects are open source (except FlavorFit — university project). Code available on GitHub with documentation and Postman collections where applicable.
          </p>
          <a [href]="githubUrl" target="_blank" rel="noopener noreferrer">
            <ui-button variant="ghost" size="md" label="View All Repositories" [iconRight]="Github" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class AdditionalProjectsComponent implements OnInit {
  private githubApi = inject(GitHubApiService);
  protected projectsData = projectsData;
  protected Github = Github;
  protected ExternalLink = ExternalLink;
  protected Lock = Lock;
  protected CheckCircle = CheckCircle;
  protected AlertTriangle = AlertTriangle;
  protected Code = Code;
  protected GitBranch = GitBranch;
  protected Send = Send;
  protected ChevronRight = ChevronRight;
  protected githubUrl = 'https://github.com/rehman4113';

  protected additionalProjects = computed(() =>
    this.projectsData.filter(p => p.category === 'additional')
  );

  protected githubStats = computed(() => {
    const statsMap = new Map<string, RepoStats>();
    return (id: string) => statsMap.get(id);
  });

  ngOnInit() {
    this.loadGitHubStats();
  }

  private loadGitHubStats() {
    this.githubApi.fetchAllPublicReposStats('rehman4113').subscribe({
      next: (results) => {
        console.log('GitHub stats loaded:', results);
      },
      error: (err) => {
        console.warn('Failed to load GitHub stats:', err);
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}