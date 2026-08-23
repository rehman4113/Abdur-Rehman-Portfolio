import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Image } from 'lucide-angular';

@Component({
  selector: 'ui-image-slot',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative bg-dark-950" [class]="containerClasses()">
      @if (src()) {
        <img
          [src]="src()"
          [alt]="alt()"
          [class]="imageClasses()"
          [loading]="loading()"
          (error)="onError()"
        />
      } @else {
        <div [class]="placeholderClasses()">
          <lucide-angular [img]="Image" [size]="iconSize()" strokeWidth="1.5" class="text-dark-300"></lucide-angular>
          @if (placeholderText()) {
            <p class="mt-2 text-sm text-dark-400">{{ placeholderText() }}</p>
          }
        </div>
      }
    </div>
  `,
})
export class ImageSlotComponent {
  src = input<string>('');
  alt = input.required<string>();
  loading = input<'lazy' | 'eager'>('lazy');
  aspectRatio = input<'16:10' | '9:16' | '16:9' | '4:3' | '1:1'>('16:10');
  objectFit = input<'cover' | 'contain' | 'fill'>('contain');
  placeholderText = input<string>('Image not available');
  radius = input<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('lg');

  protected Image = Image;

  iconSize = computed(() => 40);

  containerClasses = computed(() => {
    const ratios = {
      '16:10': 'aspect-[16/10]',
      '9:16': 'aspect-[9/16]',
      '16:9': 'aspect-video',
      '4:3': 'aspect-[4/3]',
      '1:1': 'aspect-square',
    };
    const radii = {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full',
    };
    return `relative w-full ${ratios[this.aspectRatio()]} ${radii[this.radius()]}`;
  });

  imageClasses = computed(() => {
    const fits = { cover: 'object-cover', contain: 'object-contain', fill: 'object-fill' };
    return `absolute inset-0 w-full h-full ${fits[this.objectFit()]}`;
  });

  placeholderClasses = computed(() => {
    const radii = {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full',
    };
    return `absolute inset-0 bg-dark-950 flex flex-col items-center justify-center ${radii[this.radius()]}`;
  });

  onError() {
    // Image will fall back to placeholder via src() becoming empty
  }
}