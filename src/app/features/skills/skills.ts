import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Code, Layers, GitBranch, Link, Settings, Shield, Network, Zap, Cpu, Brain, FileCode, Database, Key, Lock, LayoutDashboard, Server, GitCompare, Send, Users, CreditCard } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { BadgeComponent } from '../../shared/components/ui/badge/badge';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';
import { skillsData } from '../../core/data/skills.data';

const iconMap: Record<string, any> = {
  code: Code,
  layers: Layers,
  'git-branch': GitBranch,
  link: Link,
  settings: Settings,
  shield: Shield,
  network: Network,
  zap: Zap,
  cpu: Cpu,
  brain: Brain,
  'file-code': FileCode,
  database: Database,
  key: Key,
  lock: Lock,
  layout: LayoutDashboard,
  server: Server,
  'git-compare': GitCompare,
  send: Send,
  users: Users,
  'credit-card': CreditCard,
};

@Component({
  selector: 'feature-skills',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SectionHeaderComponent, BadgeComponent, ScrollRevealDirective],
  template: `
    <section id="skills" class="section bg-dark-50" aria-labelledby="skills-title">
      <div class="container-custom">
        <ui-section-header
          title="Skills & Technologies"
          subtitle="Technologies I work with daily"
          [description]="'Grouped by domain — from core languages to distributed systems and AI integration.'"
        />

        <div class="space-y-12">
          @for (group of skillsData; track group.category; let i = $index) {
            <div class="card-hover p-6 md:p-8 bg-white border-dark-200" scrollReveal [delay]="i * 100">
              <div class="flex items-center gap-3 mb-6">
                <div class="p-3 rounded-xl bg-primary-100 text-primary-600">
                  <lucide-angular [img]="getCategoryIcon(group.category)" [size]="24" strokeWidth="2"></lucide-angular>
                </div>
                <h3 class="font-display font-semibold text-heading-md text-dark-1000">{{ group.category }}</h3>
              </div>

              <div class="flex flex-wrap gap-3" role="list" aria-label="{{ group.category }} skills">
                @for (skill of group.skills; track skill.name) {
                  <ui-badge variant="primary" size="md" [icon]="iconMap[skill.icon || 'code']" role="listitem">
                    {{ skill.name }}
                  </ui-badge>
                }
              </div>
            </div>
          }
        </div>

        <div class="mt-16" scrollReveal [delay]="skillsData.length * 100">
          <h3 class="font-display font-semibold text-heading-md text-dark-1000 text-center mb-8">
            Currently Exploring
          </h3>
          <div class="flex flex-wrap justify-center gap-3">
            @for (tech of exploringTech; track tech) {
              <ui-badge variant="outline" size="md">{{ tech }}</ui-badge>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected skillsData = skillsData;
  protected iconMap = iconMap;
  protected exploringTech = [
    'Spring Modulith',
    'Spring AI',
    'NVIDIA NIM',
    'Event Sourcing',
    'gRPC',
    'Kotlin',
    'WebAssembly',
  ];

  getCategoryIcon(category: string): any {
    const icons: Record<string, any> = {
      'Languages': Code,
      'Frameworks': Layers,
      'Microservices & Distributed Systems': Network,
      'AI Integration': Brain,
      'Databases': Database,
      'Security': Shield,
      'Other': LayoutDashboard,
    };
    return icons[category] || Code;
  }
}