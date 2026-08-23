import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SkipLinkComponent } from './shared/components/layout/skip-link/skip-link';
import { FooterComponent } from './shared/components/layout/footer/footer';
import { FloatingNavComponent } from './shared/components/layout/floating-nav/floating-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SkipLinkComponent, FooterComponent, FloatingNavComponent],
  template: `
    <layout-skip-link />
    <layout-floating-nav />
    <router-outlet />
    <layout-footer />
  `,
})
export class AppComponent {}