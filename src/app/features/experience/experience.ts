import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight, CheckCircle, Building, Briefcase, Users, Target, MapPin } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';
import { experienceData } from '../../core/data/experience.data';

@Component({
  selector: 'feature-experience',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SectionHeaderComponent, ScrollRevealDirective],
  template: `
    <section id="experience" class="section bg-dark-1000" aria-labelledby="experience-title">
      <div class="container-custom">
        <ui-section-header
          title="Professional Experience"
          subtitle="My journey from independent projects to SaaS ownership"
          [description]="'Three phases of growth at Litgrey Technology — each building on the last.'"
        />

        <div class="relative max-w-3xl mx-auto">
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-transparent" aria-hidden="true"></div>

          <div class="space-y-12 relative">
            @for (stage of experienceData.stages; track stage.title; let i = $index) {
              <article class="relative pl-16" scrollReveal [delay]="i * 150">
                <div class="absolute left-0 top-2 flex items-center justify-center w-16 h-16">
                  <div
                    class="relative w-4 h-4 rounded-full bg-primary-500 border-4 border-dark-1000 z-10 shadow-lg"
                    [class.ring-2]="true"
                    [class.ring-primary-500]="true"
                  ></div>
                  <div class="absolute inset-0 w-4 h-4 rounded-full bg-primary-500/30 animate-pulse-soft" aria-hidden="true"></div>
                </div>

                <div class="card-hover p-6 md:p-8 bg-dark-950 border-dark-800">
                  <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div class="flex items-center gap-2 text-sm font-medium text-primary-400 mb-2">
                        <lucide-angular [img]="stageIcons[i]" [size]="16" strokeWidth="2"></lucide-angular>
                        <span>{{ stage.title }}</span>
                      </div>
                      <div class="flex items-center gap-3 text-dark-400 text-sm">
                        <span class="px-3 py-1 rounded-full bg-dark-800 border border-dark-700 font-mono text-xs">{{ stage.period }}</span>
                        <span class="hidden sm:inline-flex items-center gap-1">
                          <lucide-angular [img]="Building" [size]="14" strokeWidth="2"></lucide-angular>
                          Litgrey Technology
                        </span>
                        <span class="hidden sm:inline-flex items-center gap-1">
                          <lucide-angular [img]="MapPin" [size]="14" strokeWidth="2"></lucide-angular>
                          Islamabad, Pakistan (Hybrid)
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-primary-500 font-medium text-sm md:shrink-0">
                      <lucide-angular [img]="ChevronRight" [size]="18" strokeWidth="2.5"></lucide-angular>
                    </div>
                  </div>

                  <p class="text-dark-300 text-body mb-6 leading-relaxed">{{ stage.description }}</p>

                  <div class="space-y-3" role="list" aria-label="Key achievements">
                    @for (highlight of stage.highlights; track highlight) {
                      <div class="flex items-start gap-3 p-3 rounded-xl bg-dark-900/50 border border-dark-800 hover:border-primary-500/30 transition-colors">
                        <div class="flex-shrink-0 mt-0.5">
                          <lucide-angular [img]="CheckCircle" [size]="18" strokeWidth="2.5" class="text-primary-500"></lucide-angular>
                        </div>
                        <p class="text-dark-300 text-body-sm leading-relaxed">{{ highlight }}</p>
                      </div>
                    }
                  </div>
                </div>
              </article>
            }

            <div class="relative pl-16 pt-8" scrollReveal [delay]="experienceData.stages.length * 150">
              <div class="absolute left-0 top-2 flex items-center justify-center w-16 h-16">
                <div class="relative w-4 h-4 rounded-full bg-secondary-500 border-4 border-dark-1000 z-10"></div>
              </div>
              <div class="card-hover p-6 md:p-8 bg-dark-950 border-dark-800 text-center">
                <div class="p-3 rounded-xl bg-secondary-100 text-secondary-600 w-fit mx-auto mb-4">
                  <lucide-angular [img]="Target" [size]="24" strokeWidth="2"></lucide-angular>
                </div>
                <h3 class="font-display font-semibold text-heading-md text-dark-100 mb-3">Current Focus</h3>
                <p class="text-dark-400 text-body max-w-2xl mx-auto leading-relaxed">
                  Owning backend delivery for the Optician Business SaaS platform — architecting scalable APIs, implementing finance/billing workflows, and leading technical design for new features. Actively exploring AI-enhanced developer tooling and conversational interfaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  protected experienceData = experienceData;
  protected stageIcons = [Briefcase, Users, Target];
  protected Building = Building;
  protected Briefcase = Briefcase;
  protected Users = Users;
  protected Target = Target;
  protected ChevronRight = ChevronRight;
  protected CheckCircle = CheckCircle;
  protected MapPin = MapPin;
}