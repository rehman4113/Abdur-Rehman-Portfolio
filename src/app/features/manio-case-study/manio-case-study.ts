import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { ButtonComponent } from '../../shared/components/ui/button/button';
import { BadgeComponent } from '../../shared/components/ui/badge/badge';
import { projectsData } from '../../core/data/projects.data';
import { ScrollService } from '../../core/services/scroll.service';

const manioProject = projectsData.find(p => p.id === 'manio')!;

@Component({
  selector: 'feature-manio-case-study',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SectionHeaderComponent, ButtonComponent, BadgeComponent],
  template: `
    <section id="work" class="section bg-dark-1000">
      <div class="container-custom">
        <ui-section-header title="Flagship Project: Manio" subtitle="Personal Finance Tracker" eyebrow="Featured Work" />
        <div class="py-12">
          <div class="flex flex-col lg:flex-row gap-6 items-start">
            <div class="space-y-3">
              <div class="flex flex-wrap gap-3">
                <ui-badge variant="primary" size="lg" [dot]="true">Flagship Project</ui-badge>
                <ui-badge variant="secondary" size="lg">Full-Stack</ui-badge>
                <ui-badge variant="accent" size="lg">AI-Integrated</ui-badge>
              </div>
              <h2 class="font-display font-bold text-display-md text-dark-1000">Manio</h2>
              <p class="text-body-lg text-dark-400 leading-relaxed">
                Manio is a full-stack personal finance tracker built with Angular and Spring Boot,
                enhanced with Spring AI + WhatsApp automation for conversational finance management.
                Users can text "spent 500 on groceries" on WhatsApp and it parses, confirms, and
                records the transaction automatically.
              </p>
            </div>
            <div class="hidden lg:block">
              <div class="flex flex-wrap gap-3">
                @for (tech of manioProject.techStack.slice(0, 6); track tech) {
                  <ui-badge variant="primary" size="md">{{ tech }}</ui-badge>
                }
              </div>
            </div>
          </div>
          <div class="mt-6 lg:mt-0">
            <div class="flex gap-3">
              <a href="https://personal-finance-tracker-aot.pages.dev/" target="_blank" rel="noopener noreferrer" class="group">
                <ui-button variant="primary" size="lg" label="Live Demo" />
              </a>
              <ui-button variant="ghost" size="lg" label="Case Study" (onClick)="viewCaseStudy()" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ManioCaseStudyComponent implements OnInit {
  protected router = inject(Router);
  protected manioProject = manioProject;

  ngOnInit() {}

  viewCaseStudy() {
    this.router.navigate(['/work/manio']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}