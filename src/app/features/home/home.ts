import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkComponent } from '../../shared/components/layout/skip-link/skip-link';
import { HeroComponent } from '../hero/hero';
import { AboutComponent } from '../about/about';
import { ExperienceComponent } from '../experience/experience';
import { SkillsComponent } from '../skills/skills';
import { ManioCaseStudyComponent } from '../manio-case-study/manio-case-study';
import { AdditionalProjectsComponent } from '../additional-projects/additional-projects';
import { EducationComponent } from '../education/education';
import { ContactComponent } from '../contact/contact';

@Component({
  selector: 'feature-home',
  standalone: true,
  imports: [
    CommonModule,
    SkipLinkComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ManioCaseStudyComponent,
    AdditionalProjectsComponent,
    EducationComponent,
    ContactComponent,
  ],
  template: `
    <layout-skip-link />
    <main id="main-content" class="min-h-screen">
      <feature-hero />
      <feature-about />
      <feature-experience />
      <feature-skills />
      <feature-manio-case-study />
      <feature-additional-projects />
      <feature-education />
      <feature-contact />
    </main>
  `,
})
export class HomeComponent {}