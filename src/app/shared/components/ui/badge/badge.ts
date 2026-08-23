import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'dark';
type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <span [class]="computedClasses()">
      @if (icon()) {
        <lucide-angular [img]="icon()" [size]="iconSize()" strokeWidth="2" class="mr-1.5"></lucide-angular>
      }
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  variant = input<BadgeVariant>('primary');
  size = input<BadgeSize>('md');
  icon = input<any>(null);
  dot = input(false);

  iconSize = computed(() => {
    switch (this.size()) {
      case 'sm': return 10;
      case 'lg': return 14;
      default: return 12;
    }
  });

  computedClasses = computed(() => {
    const base = 'inline-flex items-center gap-1.5 font-medium rounded-full';
    const variants: Record<BadgeVariant, string> = {
      primary: 'bg-primary-100 text-primary-700',
      secondary: 'bg-secondary-100 text-secondary-700',
      accent: 'bg-accent-100 text-accent-700',
      outline: 'bg-transparent text-dark-600 border border-dark-300',
      dark: 'bg-dark-900 text-dark-100',
    };
    const sizes: Record<BadgeSize, string> = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-xs',
      lg: 'px-4 py-1.5 text-sm',
    };
    return `${base} ${variants[this.variant()]} ${sizes[this.size()]}`;
  });
}