import { Directive, ElementRef, inject, OnInit, OnDestroy, input, PLATFORM_ID } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { isPlatformBrowser } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[scrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();
  private isBrowser = isPlatformBrowser(this.platformId);
  private observer?: IntersectionObserver;

  delay = input<number>(0);
  threshold = input<number>(0.1);
  rootMargin = input<string>('0px 0px -50px 0px');
  once = input<boolean>(true);

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.elementRef.nativeElement.style.opacity = '1';
      this.elementRef.nativeElement.style.transform = 'none';
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.elementRef.nativeElement.style.opacity = '1';
      this.elementRef.nativeElement.style.transform = 'none';
      return;
    }

    this.elementRef.nativeElement.style.opacity = '0';
    this.elementRef.nativeElement.style.transform = 'translateY(30px)';
    this.elementRef.nativeElement.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.elementRef.nativeElement.style.opacity = '1';
              this.elementRef.nativeElement.style.transform = 'translateY(0)';
            }, this.delay());
            if (this.once()) {
              this.observer?.unobserve(this.elementRef.nativeElement);
            }
          } else if (!this.once()) {
            this.elementRef.nativeElement.style.opacity = '0';
            this.elementRef.nativeElement.style.transform = 'translateY(30px)';
          }
        });
      },
      { threshold: this.threshold(), rootMargin: this.rootMargin() }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.observer?.disconnect();
  }
}

export function scrollRevealAnimation(delay = 0) {
  return {
    delay,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once: true,
  };
}