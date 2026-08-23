import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article [class]="computedClasses()">
      <ng-content></ng-content>
    </article>
  `,
})
export class CardComponent {
  hover = input(true);
  bordered = input(true);
  glow = input(false);
  padding = input<'none' | 'sm' | 'md' | 'lg'>('md');

  computedClasses = computed(() => {
    const base = 'bg-dark-50 rounded-2xl overflow-hidden transition-all duration-300';
    const border = this.bordered() ? 'border border-dark-200' : '';
    const hover = this.hover() ? 'hover:shadow-xl hover:-translate-y-1 hover:border-primary-200' : '';
    const glow = this.glow() ? 'relative' : '';
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    return `${base} ${border} ${hover} ${glow} ${paddings[this.padding()]}`;
  });
}