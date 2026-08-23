import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowRight, Download, ChevronDown } from 'lucide-angular';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="computedClasses()"
      (click)="onClick.emit($event)"
    >
      @if (loading()) {
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      } @else if (iconLeft()) {
        <lucide-angular [img]="iconLeft()" [size]="iconSize()" strokeWidth="2"></lucide-angular>
      }
      <span>{{ label() }}</span>
      @if (iconRight() && !loading()) {
        <lucide-angular [img]="iconRight()" [size]="iconSize()" strokeWidth="2"></lucide-angular>
      }
    </button>
  `,
})
export class ButtonComponent {
  label = input.required<string>();
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  loading = input(false);
  iconLeft = input<any>(null);
  iconRight = input<any>(null);
  fullWidth = input(false);
  onClick = output<MouseEvent>();

  protected ArrowRight = ArrowRight;
  protected Download = Download;
  protected ChevronDown = ChevronDown;

  iconSize = computed(() => {
    switch (this.size()) {
      case 'sm': return 16;
      case 'lg': return 20;
      default: return 18;
    }
  });

  computedClasses = computed(() => {
    const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-1000 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35 hover:-translate-y-0.5',
      secondary: 'bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white hover:-translate-y-0.5',
      ghost: 'bg-transparent text-dark-600 hover:bg-dark-100 hover:text-dark-900',
    };
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-2.5',
    };
    const width = this.fullWidth() ? 'w-full' : '';
    return `${base} ${variants[this.variant()]} ${sizes[this.size()]} ${width}`;
  });
}