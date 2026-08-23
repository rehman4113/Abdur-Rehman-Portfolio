import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, BadgeAlert } from 'lucide-angular';
import { BadgeComponent } from '../badge/badge';

@Component({
  selector: 'ui-section-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, BadgeComponent],
  template: `
    <header class="section-header" [class.max-w-3xl]="!fullWidth()" [class.mx-auto]="!fullWidth()">
      @if (eyebrow()) {
        <ui-badge variant="primary" size="sm" class="mb-4 inline-block">{{ eyebrow() }}</ui-badge>
      }
      <h2 class="section-title text-orange-400">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="section-subtitle">{{ subtitle() }}</p>
      }
      @if (description()) {
        <p class="mt-6 text-body text-dark-500 max-w-2xl mx-auto">{{ description() }}</p>
      }
    </header>
  `,
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  description = input<string>('');
  eyebrow = input<string>('');
  fullWidth = input(false);
}