import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, GraduationCap, Award, BookOpen, MapPin, Calendar } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { CardComponent } from '../../shared/components/ui/card/card';
import { BadgeComponent } from '../../shared/components/ui/badge/badge';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';

@Component({
  selector: 'feature-education',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SectionHeaderComponent, CardComponent, BadgeComponent, ScrollRevealDirective],
  template: `
    <section id="education" class="section bg-dark-1000" aria-labelledby="education-title">
      <div class="container-custom">
        <ui-section-header
          title="Education"
          subtitle="Academic background"
          description="Bachelor's degree in Software Engineering with focus on backend systems and algorithms."
        />

        <div class="max-w-2xl mx-auto" scrollReveal [delay]="0">
          <div class="card-hover p-6 md:p-8 bg-dark-950 border-dark-800 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full blur-2xl" aria-hidden="true"></div>

            <div class="relative flex items-start gap-6">
              <div class="flex-shrink-0 p-4 rounded-2xl bg-primary-100 text-primary-600">
                <lucide-angular [img]="GraduationCap" [size]="32" strokeWidth="2"></lucide-angular>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <ui-badge variant="primary" size="md">BS Software Engineering</ui-badge>
                  <ui-badge variant="secondary" size="md">2021 – 2025</ui-badge>
                </div>

                <h3 id="education-title" class="font-display font-bold text-heading-lg text-dark-100 mb-2">
                  International Islamic University, Islamabad
                </h3>

                <div class="flex flex-wrap gap-4 mb-6 text-dark-400 text-sm">
                  <span class="flex items-center gap-1">
                    <lucide-angular [img]="MapPin" [size]="14" strokeWidth="2"></lucide-angular>
                    Islamabad, Pakistan
                  </span>
                  <span class="flex items-center gap-1">
                    <lucide-angular [img]="Calendar" [size]="14" strokeWidth="2"></lucide-angular>
                    2021 – 2025
                  </span>
                </div>

                <p class="text-dark-300 text-body mb-6 leading-relaxed">
                  Completed Bachelor's degree in Software Engineering with a focus on web development, algorithms, data structures, and software design patterns. Graduated with hands-on experience in building full-stack applications and backend systems.
                </p>

                <div class="space-y-4">
                  <h4 class="font-display font-medium text-dark-200 flex items-center gap-2">
                    <lucide-angular [img]="BookOpen" [size]="18" strokeWidth="2" class="text-primary-500"></lucide-angular>
                    Key Coursework
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    @for (subject of subjects; track subject) {
                      <ui-badge variant="outline" size="sm">{{ subject }}</ui-badge>
                    }
                  </div>

                  <h4 class="font-display font-medium text-dark-200 flex items-center gap-2">
                    <lucide-angular [img]="Award" [size]="18" strokeWidth="2" class="text-accent-500"></lucide-angular>
                    Final Year Project
                  </h4>
                  <div class="p-4 rounded-xl bg-dark-900 border border-dark-800">
                    <p class="text-dark-300 text-body-sm mb-2">
                      <strong class="text-dark-100">FlavorFit — Meal Ordering App</strong> — Backend for a meal ordering platform with JWT-secured, role-based APIs managing users, orders, and nutritionist recommendations. Built with Spring Boot, MongoDB, and JWT.
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <ui-badge variant="secondary" size="sm">Spring Boot</ui-badge>
                      <ui-badge variant="secondary" size="sm">MongoDB</ui-badge>
                      <ui-badge variant="secondary" size="sm">JWT</ui-badge>
                      <ui-badge variant="outline" size="sm">Private Repo</ui-badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {
  protected GraduationCap = GraduationCap;
  protected Award = Award;
  protected BookOpen = BookOpen;
  protected MapPin = MapPin;
  protected Calendar = Calendar;

  protected subjects = [
    'Data Structures & Algorithms',
    'Software Design Patterns',
    'Web Development',
    'Database Management Systems',
    'Object-Oriented Programming',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering Principles',
    'Human-Computer Interaction',
    'Project Management',
  ];
}