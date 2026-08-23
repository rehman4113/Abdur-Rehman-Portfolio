import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Code, Award, Users, Zap } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { ImageSlotComponent } from '../../shared/components/ui/image-slot/image-slot';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';
import { siteConfig } from '../../core/data/site.config';

const stats = [
  { value: '3+', label: 'Years Experience', icon: Code },
  { value: '10+', label: 'Projects Completed', icon: Award },
  { value: '4', label: 'Team Members Led', icon: Users },
  { value: '100%', label: 'Delivery Rate', icon: Zap },
] as const;

@Component({
  selector: 'feature-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SectionHeaderComponent, ImageSlotComponent, ScrollRevealDirective],
  template: `
    <section id="about" class="section bg-dark-50" aria-labelledby="about-title">
      <div class="container-custom">
        <ui-section-header
          title="About Me"
          subtitle="Backend Developer Focused on Systems That Scale"
          [description]="'I design backend systems with the same question in mind at every layer: what happens when this breaks? That mindset shapes everything I build — from fault-tolerant microservices with circuit breakers and service discovery, to Manio, a finance platform where an outbox pattern guarantees WhatsApp replies deliver even when Meta\\'s API doesn\\'t cooperate. At Litgrey Technology, I\\'ve moved from shipping individual API endpoints to owning backend delivery for an entire SaaS platform — architecture decisions, module boundaries, and the judgment calls that come with being the person modules answer to. I care less about using the newest tool and more about whether the system I hand off is one I\\'d trust in production without watching it.'"
        />

        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div class="relative" scrollReveal [delay]="300">
            <div class="aspect-[4/5] max-w-lg lg:mx-auto">
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl blur-xl"></div>
              <div class="relative rounded-2xl overflow-hidden border border-dark-200 bg-white shadow-2xl">
                <ui-image-slot
                  [src]="aboutImage"
                  [alt]="'Abdur Rehman working on backend development'"
                  aspectRatio="9:16"
                  radius="xl"
                  [loading]="'lazy'"
                  placeholderText="About me photo"
                />
              </div>
            </div>

            <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-2xl" aria-hidden="true"></div>
          </div>

          <div class="space-y-8" scrollReveal [delay]="0">
            <h3 id="about-title" class="font-display font-semibold text-heading-lg text-dark-1000">
              Backend Developer with a Growth Mindset
            </h3>

            <div class="grid grid-cols-2 gap-4" scrollReveal [delay]="200">
              @for (stat of stats; track stat.label) {
                <div class="p-5 rounded-2xl bg-white border border-dark-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="p-2 rounded-lg bg-primary-100 text-primary-600">
                      <lucide-angular [img]="stat.icon" [size]="20" strokeWidth="2"></lucide-angular>
                    </div>
                    <span class="font-display font-bold text-heading-md text-dark-1000">{{ stat.value }}</span>
                  </div>
                  <p class="text-body-sm text-dark-500">{{ stat.label }}</p>
                </div>
              }
            </div>

            <div class="grid md:grid-cols-3 gap-6" scrollReveal [delay]="300">
              @for (item of highlights; track item.title) {
                <div class="p-6 rounded-2xl bg-white border border-dark-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                  <div class="p-3 rounded-xl bg-primary-100 text-primary-600 w-fit mb-4">
                    <lucide-angular [img]="item.icon" [size]="24" strokeWidth="2"></lucide-angular>
                  </div>
                  <h4 class="font-display font-semibold text-heading-sm text-dark-1000 mb-2">{{ item.title }}</h4>
                  <p class="text-body-sm text-dark-500">{{ item.description }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected siteConfig = siteConfig;
  protected aboutImage = 'assets/about pic 1.jpg';
  protected stats = stats;
  protected Code = Code;
  protected Award = Award;
  protected Users = Users;
  protected Zap = Zap;

  protected highlights = [
    {
      title: 'End-to-End Ownership',
      description: 'From API design and database schema to deployment and frontend integration — I own the full backend lifecycle.',
      icon: Code,
    },
    {
      title: 'Team Leadership',
      description: 'Led a 4-person cross-functional team (QA, frontend, backend) to resolve platform-wide bugs and improve delivery velocity.',
      icon: Users,
    },
    {
      title: 'AI Integration',
      description: 'Built production systems with Spring AI + NVIDIA NIM, including JSON-mode parsing workarounds and WhatsApp automation.',
      icon: Zap,
    },
  ];
}