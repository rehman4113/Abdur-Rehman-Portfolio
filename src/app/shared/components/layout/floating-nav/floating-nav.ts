import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { LucideAngularModule, Home, User, Briefcase, Code, FolderOpen, Mail, BookOpen, GraduationCap } from 'lucide-angular';
import { filter } from 'rxjs';

interface NavItem {
  id: string;
  icon: any;
  label: string;
  href?: string;
  route?: string;
  isExternal?: boolean;
  isBook?: boolean;
}

@Component({
  selector: 'layout-floating-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav
      class="fixed top-4 left-1/2 -translate-x-1/2 z-50 md:top-6 md:px-1"
      [class.md:hidden]="isMobile()"
      [class.pointer-events-none]="isMobile()"
      aria-label="Main navigation"
    >
      <div
        class="flex items-center gap-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-2xl p-1.5 pointer-events-auto"
        role="navigation"
        aria-label="Section navigation"
      >
        @for (item of navItems; track item.id) {
          <button
            type="button"
            [attr.aria-label]="item.label"
            [attr.aria-current]="activeSection() === item.id ? 'true' : 'false'"
            [class]="getButtonClasses(item)"
            (click)="navigate(item)"
            (keydown.enter)="navigate(item)"
          >
            <lucide-angular [img]="item.icon" [size]="22" strokeWidth="2.5" aria-hidden="true"></lucide-angular>
            @if (item.isBook) {
              <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
            }
          </button>
        }
      </div>
    </nav>

    <!-- Mobile Bottom Bar -->
    <nav
      class="fixed bottom-0 left-0 right-0 z-50 md:hidden pointer-events-none"
      aria-label="Mobile navigation"
    >
      <div
        class="mx-4 mb-4 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-2xl p-1 pointer-events-auto"
        role="navigation"
        aria-label="Mobile section navigation"
      >
        <div class="flex items-center justify-around gap-1">
          @for (item of navItems; track item.id) {
            <button
              type="button"
              [attr.aria-label]="item.label"
              [attr.aria-current]="activeSection() === item.id ? 'true' : 'false'"
              [class]="getButtonClasses(item, true)"
              (click)="navigate(item)"
              (keydown.enter)="navigate(item)"
            >
              <lucide-angular [img]="item.icon" [size]="24" strokeWidth="2.5" aria-hidden="true"></lucide-angular>
              @if (item.isBook) {
                <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
              }
            </button>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FloatingNavComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  protected Home = Home;
  protected User = User;
  protected Briefcase = Briefcase;
  protected Code = Code;
  protected FolderOpen = FolderOpen;
  protected Mail = Mail;
  protected BookOpen = BookOpen;
  protected GraduationCap = GraduationCap;

  protected activeSection = signal<string>('home');
  protected isOnManioRoute = signal<boolean>(false);

  protected navItems: NavItem[] = [
    { id: 'home', icon: Home, label: 'Home', href: '#home' },
    { id: 'about', icon: User, label: 'About', href: '#about' },
    { id: 'experience', icon: Briefcase, label: 'Experience', href: '#experience' },
    { id: 'skills', icon: Code, label: 'Skills', href: '#skills' },
    { id: 'work', icon: FolderOpen, label: 'Work', href: '#work' },
    { id: 'education', icon: GraduationCap, label: 'Education', href: '#education' },
    { id: 'contact', icon: Mail, label: 'Contact', href: '#contact' },
    { id: 'manio', icon: BookOpen, label: 'Manio Case Study', route: '/work/manio', isBook: true },
  ];

  private observers = new Map<string, IntersectionObserver>();
  private isDestroyed = false;

  ngOnInit() {
    this.setupRouteListener();
    this.setupIntersectionObservers();
    this.checkInitialActiveSection();
  }

  ngOnDestroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.isDestroyed = true;
  }

  private setupRouteListener() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const isManio = event.url === '/work/manio';
      this.isOnManioRoute.set(isManio);
      if (isManio) {
        this.activeSection.set('manio');
      }
    });

    // Also check initial route
    this.isOnManioRoute.set(this.router.url === '/work/manio');
    if (this.router.url === '/work/manio') {
      this.activeSection.set('manio');
    }
  }

  private setupIntersectionObservers() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      if (this.isDestroyed) return;
      // Don't update scroll-based active section when on Manio route
      if (this.isOnManioRoute()) return;

      let maxRatio = 0;
      let activeId = 'home';

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });

      if (maxRatio > 0 && activeId !== this.activeSection()) {
        this.activeSection.set(activeId);
      }
    }, observerOptions);

    // Retry observing until all sections exist (handles lazy-loaded content)
    const observeSections = () => {
      let allFound = true;
      this.navItems.forEach(item => {
        if (item.href && item.href.startsWith('#')) {
          const element = document.getElementById(item.href.slice(1));
          if (element) {
            observer.observe(element);
            this.observers.set(item.id, observer);
          } else {
            allFound = false;
          }
        }
      });
      if (!allFound && !this.isDestroyed) {
        setTimeout(observeSections, 200);
      }
    };
    observeSections();
  }

  private checkInitialActiveSection() {
    if (typeof window === 'undefined') return;
    // Don't use scroll-based logic on Manio route
    if (this.isOnManioRoute()) return;

    const sections = this.navItems
      .filter(item => item.href && item.href.startsWith('#'))
      .map(item => ({ id: item.id, element: document.getElementById(item.href!.slice(1)) }))
      .filter(({ element }) => element !== null);

    let maxVisible = 0;
    let activeId = 'home';

    sections.forEach(({ id, element }) => {
      const rect = element!.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visibleHeight > maxVisible) {
        maxVisible = visibleHeight;
        activeId = id;
      }
    });

    this.activeSection.set(activeId);
  }

  protected isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

  protected getButtonClasses(item: NavItem, isMobile = false): string {
    const isActive = this.activeSection() === item.id;
    const isBook = item.isBook;

    const base = `
      relative flex items-center justify-center
      rounded-full transition-colors duration-300
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
    `;

    const size = isMobile ? 'w-12 h-12' : 'w-10 h-10';

    if (isBook) {
      return `
        ${base} ${size}
        ${isActive
          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40'
          : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 hover:text-orange-300'}
        ${!isActive ? 'hover:shadow-lg hover:shadow-orange-500/20' : ''}
      `;
    }

    return `
      ${base} ${size}
      ${isActive
        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40'
        : 'text-slate-400 hover:text-orange-500 hover:bg-orange-500/10'}
    `;
  }

  protected navigate(item: NavItem) {
    if (item.isBook && item.route) {
      window.open(item.route, '_blank', 'noopener,noreferrer');
      return;
    }

    if (item.href && item.href.startsWith('#')) {
      const element = document.getElementById(item.href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.activeSection.set(item.id);
      }
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}