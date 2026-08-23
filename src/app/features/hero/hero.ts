import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../shared/components/ui/button/button';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';
import { siteConfig, profileSummary } from '../../core/data/site.config';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'feature-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, ButtonComponent, ScrollRevealDirective],
  template: `
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-1000 via-dark-975 to-dark-950"></div>

      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float" style="animation-delay: -3s;"></div>
        <div class="absolute top-1/2 left-1/2 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
      </div>

      <div class="container-custom relative z-10 py-20 md:py-28">
        <div class="max-w-4xl mx-auto text-center" scrollReveal [delay]="0">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6" scrollReveal [delay]="100">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Open to opportunities
          </span>

          <h1 id="hero-title" class="font-display font-bold text-display-xl text-primary-100 mb-6 leading-tight" scrollReveal [delay]="200">
            Hi, I'm <span class="gradient-text">Abdur Rehman</span>
          </h1>

          <p class="font-display font-medium text-display-sm text-primary-100 mb-6" scrollReveal [delay]="300">
            Backend Developer | Microservices, Distributed Systems & AI Automation
          </p>

          <p class="text-body-lg text-primary-100 mb-8" scrollReveal [delay]="400">
            I turn complex business workflows into backend systems that are reliable, maintainable, and built to handle failure gracefully — from secure REST APIs to fault-tolerant microservices to AI-powered automation.
          </p>

          <p class="text-body-lg text-primary-100 mb-8" scrollReveal [delay]="500">
            At Litgrey Technology, I've grown from implementing individual APIs to leading bug-resolution efforts to owning backend delivery end-to-end for a SaaS platform. Outside of work, I build systems that explore the same ideas further — including Manio, an AI-powered finance platform where users manage their money by texting WhatsApp.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center" scrollReveal [delay]="600">
            <ui-button
              variant="primary"
              size="lg"
              label="View My Work"
              (onClick)="scrollToWork()"
            />
            <a [href]="siteConfig.cvUrl" target="_blank" rel="noopener noreferrer">
              <ui-button variant="secondary" size="lg" label="Download CV" />
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  protected siteConfig = siteConfig;

  ngOnInit() {
    // Hero loads immediately
  }

  scrollToWork() {
    this.scrollService.scrollTo('work');
  }
}