import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Maximize, X } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { ButtonComponent } from '../../shared/components/ui/button/button';
import { BadgeComponent } from '../../shared/components/ui/badge/badge';
import { ImageSlotComponent } from '../../shared/components/ui/image-slot/image-slot';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';
import { projectsData } from '../../core/data/projects.data';
import { ScrollService } from '../../core/services/scroll.service';

const manioProject = projectsData.find(p => p.id === 'manio')!;

@Component({
  selector: 'feature-manio-case-study-page',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    SectionHeaderComponent,
    ButtonComponent,
    BadgeComponent,
    ImageSlotComponent,
    ScrollRevealDirective,
  ],
  template: `
    <section class="section bg-dark-1000 min-h-screen">
      <div class="container-custom">
        <div class="flex items-center gap-4 mb-8">
          <ui-button variant="ghost" size="lg" label="Back to Work" (onClick)="goBack()">
            <lucide-angular [img]="ArrowLeft" [size]="20" strokeWidth="2"></lucide-angular>
            Back to Work
          </ui-button>
          <span class="text-xl font-display font-bold text-orange-400">Manio</span>
        </div>

        <ui-section-header title="Manio — Personal Finance Tracker" subtitle="Full-case study" />

        <div class="space-y-20">
          <div class="grid lg:grid-cols-2 gap-12 items-start">
            <div class="space-y-6">
              <div class="flex flex-wrap gap-3">
                <ui-badge variant="primary" size="lg" [dot]="true">Flagship Project</ui-badge>
                <ui-badge variant="secondary" size="lg">Full-Stack</ui-badge>
                <ui-badge variant="accent" size="lg">AI-Integrated</ui-badge>
              </div>
              <h2 class="font-display font-bold text-display-md text-orange-400">Manio</h2>
              <p class="text-body-lg text-dark-400 leading-relaxed">
                Full-stack personal finance tracker with multi-wallet transactions, budgets, loan tracking,
                and AI-powered WhatsApp automation for conversational finance management.
              </p>
              <div class="flex flex-wrap gap-3 pt-4">
                <a href="https://personal-finance-tracker-aot.pages.dev/" target="_blank" rel="noopener noreferrer" class="group">
                  <ui-button variant="primary" size="lg" label="Live Demo" />
                </a>
              </div>
            </div>

            <div class="relative" scrollReveal [delay]="200">
              <div class="aspect-video rounded-2xl overflow-hidden border border-dark-800 bg-dark-950 shadow-2xl">
                <ui-image-slot [src]="'assets/manio-dashboard.png'" [alt]="'Manio Dashboard Screenshot'" aspectRatio="16:10" radius="xl" [loading]="'lazy'" placeholderText="Dashboard screenshot — coming soon" />
              </div>
            </div>
          </div>

          <div class="border-t border-dark-800 pt-12" scrollReveal [delay]="300">
            <h3 class="font-display font-semibold text-heading-lg text-orange-400 mb-6">Technology Stack</h3>
            <div class="flex flex-wrap gap-3">
              @for (tech of manioProject.techStack; track tech) {
                <ui-badge variant="primary" size="md">{{ tech }}</ui-badge>
              }
            </div>
          </div>

          <div id="architecture" class="border-t border-dark-800 pt-12" scrollReveal [delay]="400">
            <h3 class="font-display font-semibold text-heading-lg text-orange-400 mb-6">Architecture Overview</h3>
            <div class="grid md:grid-cols-3 gap-6 mb-12">
              @for (module of architectureModules; track module.name) {
                <div class="card-hover p-6 bg-dark-950 border-dark-800 h-full">
                  <div class="p-3 rounded-xl bg-primary-100 text-primary-600 w-fit mb-4">
                    <span class="text-2xl font-display font-bold text-primary-600">📦</span>
                  </div>
                  <h4 class="font-display font-semibold text-heading-sm text-dark-100 mb-3">{{ module.name }}</h4>
                  <p class="text-dark-400 text-body-sm mb-4">{{ module.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of module.tech; track tech) {
                      <span class="px-2 py-1 rounded bg-dark-800 text-dark-400 text-xs font-mono">{{ tech }}</span>
                    }
                  </div>
                </div>
              }
            </div>
            <div class="card-hover p-6 bg-dark-950 border-dark-800">
              <h4 class="font-display font-semibold text-heading-sm text-dark-100 mb-4">Modular Monolith with Spring Modulith</h4>
              <p class="text-dark-400 text-body mb-4">Instead of microservices complexity, Manio uses Spring Modulith to enforce module boundaries at compile time — verified by ArchUnit, event-driven, compile-time safety.</p>
            </div>
          </div>

          <div class="border-t border-dark-800 pt-12" scrollReveal [delay]="500">
            <h3 class="font-display font-semibold text-heading-lg text-orange-400 mb-6">WhatsApp Automation Flow</h3>
            <p class="text-dark-400 text-body mb-8">Users text natural language on WhatsApp and Manio parses, confirms, and records the transaction automatically. <span class="text-orange-400">Supports English & Urdu (RTL).</span></p>
            <div class="overflow-x-auto">
              <div class="min-w-[800px]">
                <ol class="relative flex flex-col gap-0" role="list">
                  @for (step of whatsappFlow; track step.id; let i = $index) {
                    <li class="relative flex gap-6 group">
                      <div class="relative flex-shrink-0 w-12">
                        <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-dark-800" aria-hidden="true"></div>
                        <div class="relative flex items-center justify-center w-10 h-10 rounded-full bg-dark-950 border-2 border-dark-700 z-10 transition-all duration-300 group-hover:border-primary-500 group-hover:bg-primary-500/10">
                          @if (step.status === 'webhook') {
                            <span class="text-primary-500 font-display font-bold">W</span>
                          } @else if (step.status === 'ai') {
                            <span class="text-primary-500 font-display font-bold">AI</span>
                          } @else if (step.status === 'match') {
                            <span class="text-primary-500 font-display font-bold">M</span>
                          } @else if (step.status === 'state') {
                            <span class="text-primary-500 font-display font-bold">S</span>
                          } @else if (step.status === 'confirm') {
                            <span class="text-primary-500 font-display font-bold">✓</span>
                          } @else if (step.status === 'execute') {
                            <span class="text-primary-500 font-display font-bold">⚡</span>
                          } @else if (step.status === 'reply') {
                            <span class="text-primary-500 font-display font-bold">R</span>
                          } @else {
                            <span class="font-display font-bold text-dark-400 group-hover:text-primary-500 transition-colors">{{ i + 1 }}</span>
                          }
                        </div>
                      </div>
                      <div class="flex-1 min-w-0 p-5 rounded-xl bg-dark-950 border border-dark-800 hover:border-primary-500/30 transition-colors">
                        <div class="flex items-center gap-3 mb-3">
                          <h4 class="font-display font-semibold text-heading-sm text-orange-400 mb-2">{{ step.title }}</h4>
                          <ui-badge variant="secondary" size="sm">{{ step.status }}</ui-badge>
                        </div>
                        <p class="text-dark-400 text-body-sm leading-relaxed">{{ step.description }}</p>
                        @if (step.detail) {
                          <div class="mt-3 p-3 rounded-lg bg-dark-900 border border-dark-800">
                            <code class="text-primary-400 font-mono text-sm">{{ step.detail }}</code>
                          </div>
                        }
                        @if (step.inlineNote) {
                          <p class="mt-2 text-sm text-orange-400">{{ step.inlineNote }}</p>
                        }
                      </div>
                    </li>
                  }
                </ol>
              </div>
            </div>
          </div>

          <div class="border-t border-dark-800 pt-12" scrollReveal [delay]="600">
            <h3 class="font-display font-semibold text-heading-lg text-orange-400 mb-6">Core Features</h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (feature of features; track feature.title) {
                <div class="card-hover p-6 bg-dark-950 border-dark-800 h-full" scrollReveal [delay]="600">
                  <div class="p-3 rounded-xl bg-primary-100 text-primary-600 w-fit mb-4">
                    <span class="text-2xl font-display font-bold text-primary-600">👛</span>
                  </div>
                  <h4 class="font-display font-semibold text-orange-400 mb-2">{{ feature.title }}</h4>
                  <p class="text-dark-400 text-body-sm mb-3">{{ feature.description }}</p>
                  <div class="flex flex-wrap gap-1.5">
                    @for (detail of feature.details; track detail) {
                      <span class="px-2 py-0.5 rounded bg-dark-800 text-dark-400 text-xs font-mono">{{ detail }}</span>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="border-t border-dark-800 pt-12" scrollReveal [delay]="700">
            <h3 class="font-display font-semibold text-heading-lg text-orange-400 mb-6">Screenshots</h3>
            <p class="text-dark-400 text-body-sm mb-6">Click any screenshot to view full size.</p>

            <!-- Main 3-image layout -->
            <div class="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6" scrollReveal [delay]="700">
              <!-- Left column: Dashboard (top) + WhatsApp (bottom) - both 16:10 -->
              <div class="grid grid-rows-[1fr_1fr] gap-6">
                <div (click)="openLightbox(manioScreenshots[0])" class="cursor-zoom-in">
                  <ui-image-slot
                    [src]="manioScreenshots[0].src"
                    [alt]="manioScreenshots[0].alt"
                    [aspectRatio]="manioScreenshots[0].aspectRatio"
                    [objectFit]="'contain'"
                    radius="xl"
                    [loading]="'lazy'"
                    [placeholderText]="manioScreenshots[0].placeholder"
                    class="cursor-zoom-in border border-dark-800 bg-dark-950 rounded-xl"
                  >
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-1000/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                      <div class="w-full flex items-center justify-between">
                        <p class="text-sm text-dark-100 font-medium">{{ manioScreenshots[0].label }}</p>
                        <lucide-angular [img]="Maximize" [size]="18" strokeWidth="2" class="text-orange-400"></lucide-angular>
                      </div>
                    </div>
                  </ui-image-slot>
                </div>

                <div (click)="openLightbox(manioScreenshots[1])" class="cursor-zoom-in">
                  <ui-image-slot
                    [src]="manioScreenshots[1].src"
                    [alt]="manioScreenshots[1].alt"
                    [aspectRatio]="manioScreenshots[1].aspectRatio"
                    [objectFit]="'contain'"
                    radius="xl"
                    [loading]="'lazy'"
                    [placeholderText]="manioScreenshots[1].placeholder"
                    class="cursor-zoom-in border border-dark-800 bg-dark-950 rounded-xl"
                  >
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-1000/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                      <div class="w-full flex items-center justify-between">
                        <p class="text-sm text-dark-100 font-medium">{{ manioScreenshots[1].label }}</p>
                        <lucide-angular [img]="Maximize" [size]="18" strokeWidth="2" class="text-orange-400"></lucide-angular>
                      </div>
                    </div>
                  </ui-image-slot>
                </div>
              </div>

              <!-- Right column: Mobile View (9:16) spanning full height -->
              <div (click)="openLightbox(manioScreenshots[2])" class="cursor-zoom-in">
                <ui-image-slot
                  [src]="manioScreenshots[2].src"
                  [alt]="manioScreenshots[2].alt"
                  [aspectRatio]="manioScreenshots[2].aspectRatio"
                  [objectFit]="'contain'"
                  radius="xl"
                  [loading]="'lazy'"
                  [placeholderText]="manioScreenshots[2].placeholder"
                  class="cursor-zoom-in border border-dark-800 bg-dark-950 rounded-xl"
                >
                  <div class="absolute inset-0 bg-gradient-to-t from-dark-1000/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <div class="w-full flex items-center justify-between">
                      <p class="text-sm text-dark-100 font-medium">{{ manioScreenshots[2].label }}</p>
                      <lucide-angular [img]="Maximize" [size]="18" strokeWidth="2" class="text-orange-400"></lucide-angular>
                    </div>
                  </div>
                </ui-image-slot>
              </div>
            </div>

            <p class="text-center text-dark-500 text-body-sm mt-4"><em>Click any image to view full size.</em></p>
          </div>

          <div class="border-t border-dark-800 pt-12 text-center" scrollReveal [delay]="800">
            <div class="max-w-2xl mx-auto p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
              <h3 class="font-display font-bold text-display-sm text-orange-400 mb-4">Ready to explore Manio?</h3>
              <p class="text-dark-400 text-body-lg mb-8">Try the live demo to experience conversational finance management via WhatsApp.</p>
              <a href="https://personal-finance-tracker-aot.pages.dev/" target="_blank" rel="noopener noreferrer">
                <ui-button variant="primary" size="lg" label="Open Live Demo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    @if (lightboxOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/95" (click)="closeLightbox()" role="dialog" aria-modal="true" aria-label="Image preview">
        <button
          class="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          (click)="closeLightbox()"
          aria-label="Close lightbox"
        >
          <lucide-angular [img]="X" [size]="28" strokeWidth="2"></lucide-angular>
        </button>
        <button
          class="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden md:block"
          (click)="navigateLightbox(-1)"
          aria-label="Previous image"
        >
          <lucide-angular [img]="ArrowLeft" [size]="28" strokeWidth="2"></lucide-angular>
        </button>
        <button
          class="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden md:block"
          (click)="navigateLightbox(1)"
          aria-label="Next image"
        >
          <lucide-angular [img]="ArrowLeft" [size]="28" strokeWidth="2" class="rotate-180"></lucide-angular>
        </button>

        <img
          [src]="lightboxImage()?.src"
          [alt]="lightboxImage()?.alt"
          class="max-h-[85vh] max-w-[90vw] object-contain"
        />

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/70 text-sm">
          {{ lightboxIndex() + 1 }} / {{ manioScreenshots.length }}
        </div>
      </div>
    }
  `,
})
export class ManioCaseStudyPageComponent implements OnInit {
  protected router = inject(Router);
  protected scrollService = inject(ScrollService);

  protected ArrowLeft = ArrowLeft;
  protected Maximize = Maximize;
  protected X = X;

  protected manioProject = manioProject;
  protected architectureModules = [
    { name: 'Auth Module', description: 'JWT authentication', tech: ['Spring Security', 'JWT'] },
    { name: 'Finance Module', description: 'Core domain logic', tech: ['Spring Modulith', 'PostgreSQL'] },
    { name: 'Notification Module', description: 'WhatsApp webhook handling', tech: ['Spring AI', 'NVIDIA NIM'] },
  ];
  protected whatsappFlow = [
    { id: 1, title: 'Meta Webhook Receives Message', status: 'webhook', description: 'WhatsApp Business API sends incoming message payload', detail: 'POST /api/webhook/whatsapp' },
    { id: 2, title: 'LLM Parses Intent & Entities', status: 'ai', description: 'Spring AI + NVIDIA NIM extracts intent, amount, category', detail: 'response_format: json_object + Jackson mapping', inlineNote: 'NVIDIA rejects strict JSON schema — workaround with json_object + manual Jackson deserialization.' },
    { id: 3, title: 'Fuzzy Match Against User Data', status: 'match', description: 'Guessed wallets, purposes, and loan users are fuzzy-matched', detail: 'Levenshtein distance + Jaro-Winkler' },
    { id: 4, title: 'Store as AWAITING_CONFIRMATION', status: 'state', description: 'Transaction intents persisted with pending state', detail: 'status: AWAITING_CONFIRMATION' },
    { id: 5, title: 'Yes/No Confirmation Check', status: 'confirm', description: 'Next message checked for affirmation/negation first', detail: 'NLP intent: CONFIRM / CANCEL' },
    { id: 6, title: 'Query Intents Answered Immediately', status: 'execute', description: 'HISTORY, BALANCE, LOAN_HISTORY, EXPENSE_BY_CATEGORY answered from real data', detail: 'Read-only queries' },
    { id: 7, title: 'One-Shot Commands Execute Instantly', status: 'execute', description: 'WALLET_CREATE, WALLET_STATUS, LOAN_USER_CREATE execute immediately', detail: 'Idempotent operations' },
    { id: 8, title: 'Reply via Graph API + Outbox Fallback', status: 'reply', description: 'Synchronous send via Meta Graph API with outbox-scheduler fallback', detail: 'Outbox pattern for reliability', inlineNote: 'Transactional outbox with 15s polling + max 5 retries guarantees delivery even if Meta API fails.' },
  ];
  protected features = [
    { title: 'Multi-Wallet System', description: 'Unlimited user wallets + system CASH wallet with atomic cross-wallet transfers.', details: ['Income/Expense/Transfer/Loan', 'Multi-wallet splits', 'CASH system wallet'] },
    { title: 'Smart Budgets', description: 'Per-category monthly limits with three-tier alerts: NORMAL, WARNING, EXCEEDED.', details: ['Category-based', 'Monthly cycles', 'Real-time alerts'] },
    { title: 'Loan Tracking', description: 'Receivable and payable loans per person with partial repayments.', details: ['Per-person tracking', 'Partial payments', 'Interest support'] },
    { title: 'Analytics Dashboard', description: '6-month trends, budget health, category breakdowns, net worth over time.', details: ['Chart.js visualizations', '6-month windows', 'Export to CSV'] },
    { title: 'Reports & Export', description: 'CSV export with filters, category-wise analysis, tax-ready summaries. Supports English/Urdu (RTL).', details: ['CSV export', 'Date range filters', 'Category breakdown'] },
  ];
  protected manioScreenshots: Array<{ label: string; alt: string; src: string; placeholder: string; aspectRatio: '16:10' | '9:16' }> = [
    { label: 'Dashboard Overview', alt: 'Manio dashboard showing wallets, budgets, and trends', src: 'assets/manio-dashboard.png', placeholder: 'Dashboard screenshot — coming soon', aspectRatio: '16:10' },
    { label: 'WhatsApp Conversation', alt: 'WhatsApp chat showing natural language transaction entry', src: 'assets/manio-whatsapp-conversation.png', placeholder: 'WhatsApp conversation screenshot — coming soon', aspectRatio: '16:10' },
    { label: 'Mobile View', alt: 'Manio mobile responsive layout', src: 'assets/manio-mobile-view.png', placeholder: 'Mobile view screenshot — coming soon', aspectRatio: '9:16' },
  ];

  protected lightboxOpen = signal(false);
  protected lightboxIndex = signal(0);
  protected lightboxImage = signal<{ src: string; alt: string } | null>(null);

  ngOnInit() {
    document.title = 'Manio - Personal Finance Tracker Case Study | Abdur Rehman';
  }

  openLightbox(screenshot: { src: string; alt: string; label: string }) {
    this.lightboxImage.set({ src: screenshot.src, alt: screenshot.alt });
    this.lightboxIndex.set(this.manioScreenshots.findIndex(s => s.src === screenshot.src));
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    this.lightboxImage.set(null);
    this.lightboxIndex.set(0);
    document.body.style.overflow = '';
  }

  navigateLightbox(direction: number) {
    const newIndex = (this.lightboxIndex() + direction + this.manioScreenshots.length) % this.manioScreenshots.length;
    this.lightboxIndex.set(newIndex);
    this.lightboxImage.set({ src: this.manioScreenshots[newIndex].src, alt: this.manioScreenshots[newIndex].alt });
  }

  goBack() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.scrollService.scrollTo('work');
      }, 0);
    });
  }
}