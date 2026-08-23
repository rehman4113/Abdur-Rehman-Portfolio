import { Injectable, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, fromEvent, throttleTime, takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();
  private isBrowser = isPlatformBrowser(this.platformId);

  scrollY$ = new Subject<number>();
  scrollDirection$ = new Subject<'up' | 'down'>();
  private lastScrollY = 0;

  constructor() {
    if (this.isBrowser) {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(throttleTime(16), takeUntil(this.destroy$))
        .subscribe(() => {
          const currentScrollY = window.scrollY;
          this.scrollY$.next(currentScrollY);
          this.scrollDirection$.next(currentScrollY > this.lastScrollY ? 'down' : 'up');
          this.lastScrollY = currentScrollY;
        });
    }
  }

  scrollTo(elementId: string, offset = 80): void {
    if (!this.isBrowser) return;
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getScrollY(): number {
    return this.isBrowser ? window.scrollY : 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}