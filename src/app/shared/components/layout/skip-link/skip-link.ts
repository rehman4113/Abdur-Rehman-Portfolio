import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'layout-skip-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      href="#main-content"
      class="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg"
    >
      Skip to main content
    </a>
  `,
  styles: [`
    .skip-link {
      @apply transition-all duration-200;
    }
  `],
})
export class SkipLinkComponent {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}