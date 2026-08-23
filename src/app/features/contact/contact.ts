import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Mail, Phone, MessageSquare, Linkedin, Github, MapPin, Copy, Check, CheckCircle, ChevronRight } from 'lucide-angular';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header';
import { CardComponent } from '../../shared/components/ui/card/card';
import { ButtonComponent } from '../../shared/components/ui/button/button';
import { ScrollRevealDirective } from '../../core/animations/scroll-reveal.animation';
import { siteConfig } from '../../core/data/site.config';

@Component({
  selector: 'feature-contact',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SectionHeaderComponent, CardComponent, ButtonComponent, ScrollRevealDirective],
  template: `
    <section id="contact" class="section bg-dark-50" aria-labelledby="contact-title">
      <div class="container-custom">
        <ui-section-header
          title="Get In Touch"
          subtitle="Let's work together"
          description="I'm always open to discussing new opportunities, interesting projects, or just connecting with fellow developers."
        />

        <div class="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Email Card -->
          <article class="card-hover p-6 md:p-8 bg-white border-dark-200 text-center" scrollReveal [delay]="0">
            <div class="p-4 rounded-2xl bg-primary-100 text-primary-600 w-fit mx-auto mb-6">
              <lucide-angular [img]="Mail" [size]="28" strokeWidth="2"></lucide-angular>
            </div>
            <h3 class="font-display font-semibold text-heading-md text-dark-1000 mb-2">Email</h3>
            <p class="text-dark-500 text-body-sm mb-6">Best for project inquiries and detailed discussions</p>
            <a [href]="'mailto:' + siteConfig.email" class="block">
              <ui-button variant="primary" [fullWidth]="true" label="qazi912732@gmail.com" [iconLeft]="Mail" />
            </a>
            <button
              (click)="copyToClipboard(siteConfig.email, 'email')"
              class="mt-4 w-full flex items-center justify-center gap-2 text-sm text-dark-500 hover:text-primary-500 transition-colors"
              [attr.aria-label]="'Copy email address' + (copiedField() === 'email' ? ' (copied)' : '')"
            >
              @if (copiedField() === 'email') {
                <lucide-angular [img]="Check" [size]="16" strokeWidth="2" class="text-primary-500"></lucide-angular>
                <span>Copied!</span>
              } @else {
                <lucide-angular [img]="Copy" [size]="16" strokeWidth="2"></lucide-angular>
                <span>Copy Email</span>
              }
            </button>
          </article>

          <!-- WhatsApp Card -->
          <article class="card-hover p-6 md:p-8 bg-white border-dark-200 text-center" scrollReveal [delay]="100">
            <div class="p-4 rounded-2xl bg-green-100 text-green-600 w-fit mx-auto mb-6">
              <lucide-angular [img]="MessageSquare" [size]="28" strokeWidth="2"></lucide-angular>
            </div>
            <h3 class="font-display font-semibold text-heading-md text-dark-1000 mb-2">WhatsApp</h3>
            <p class="text-dark-500 text-body-sm mb-6">Quick questions and informal chats</p>
            <a [href]="siteConfig.whatsappUrl" target="_blank" rel="noopener noreferrer" class="block">
              <ui-button variant="primary" [fullWidth]="true" label="+92 313 0584113" [iconLeft]="MessageSquare" />
            </a>
            <button
              (click)="copyToClipboard(siteConfig.phone, 'phone')"
              class="mt-4 w-full flex items-center justify-center gap-2 text-sm text-dark-500 hover:text-primary-500 transition-colors"
              [attr.aria-label]="'Copy phone number' + (copiedField() === 'phone' ? ' (copied)' : '')"
            >
              @if (copiedField() === 'phone') {
                <lucide-angular [img]="Check" [size]="16" strokeWidth="2" class="text-primary-500"></lucide-angular>
                <span>Copied!</span>
              } @else {
                <lucide-angular [img]="Copy" [size]="16" strokeWidth="2"></lucide-angular>
                <span>Copy Phone</span>
              }
            </button>
          </article>

          <!-- Location Card -->
          <article class="card-hover p-6 md:p-8 bg-white border-dark-200 text-center" scrollReveal [delay]="200">
            <div class="p-4 rounded-2xl bg-secondary-100 text-secondary-600 w-fit mx-auto mb-6">
              <lucide-angular [img]="MapPin" [size]="28" strokeWidth="2"></lucide-angular>
            </div>
            <h3 class="font-display font-semibold text-heading-md text-dark-1000 mb-2">Location</h3>
            <p class="text-dark-500 text-body-sm mb-6">Based in Islamabad, open to remote/hybrid</p>
            <div class="text-dark-600 text-body leading-relaxed">
              <p class="font-medium text-dark-900">{{ siteConfig.location }}</p>
              <p class="text-sm text-dark-500 mt-1">GMT+5 (PKT)</p>
            </div>
            <button
              (click)="copyToClipboard(siteConfig.location, 'location')"
              class="mt-4 w-full flex items-center justify-center gap-2 text-sm text-dark-500 hover:text-primary-500 transition-colors"
              [attr.aria-label]="'Copy location' + (copiedField() === 'location' ? ' (copied)' : '')"
            >
              @if (copiedField() === 'location') {
                <lucide-angular [img]="Check" [size]="16" strokeWidth="2" class="text-primary-500"></lucide-angular>
                <span>Copied!</span>
              } @else {
                <lucide-angular [img]="Copy" [size]="16" strokeWidth="2"></lucide-angular>
                <span>Copy Location</span>
              }
            </button>
          </article>
        </div>

        <!-- Social Links -->
        <div class="mt-16" scrollReveal [delay]="300">
          <h3 class="font-display font-semibold text-heading-md text-dark-1000 text-center mb-8">Connect Online</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              [href]="siteConfig.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300 min-w-[200px]"
              aria-label="LinkedIn Profile"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <lucide-angular [img]="Linkedin" [size]="24" strokeWidth="2"></lucide-angular>
                </div>
                <div class="text-left">
                  <p class="font-display font-semibold text-dark-100">LinkedIn</p>
                  <p class="text-sm text-dark-500">Connect professionally</p>
                </div>
              </div>
            </a>

            <a
              [href]="siteConfig.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300 min-w-[200px]"
              aria-label="GitHub Profile"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl bg-dark-100 text-dark-600 group-hover:bg-dark-900 group-hover:text-white transition-colors">
                  <lucide-angular [img]="Github" [size]="24" strokeWidth="2"></lucide-angular>
                </div>
                <div class="text-left">
                  <p class="font-display font-semibold text-dark-100">GitHub</p>
                  <p class="text-sm text-dark-500">View my repositories</p>
                </div>
              </div>
            </a>

            <a
              [href]="'mailto:' + siteConfig.email"
              class="group p-4 rounded-2xl bg-white border border-dark-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300 min-w-[200px]"
              aria-label="Send Email"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <lucide-angular [img]="Mail" [size]="24" strokeWidth="2"></lucide-angular>
                </div>
                <div class="text-left">
                  <p class="font-display font-semibold text-dark-100">Email Direct</p>
                  <p class="text-sm text-dark-500">Open in mail client</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Availability Note -->
        <div class="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-center" scrollReveal [delay]="400">
          <div class="flex items-center justify-center gap-2 text-primary-600 mb-3">
            <lucide-angular [img]="CheckCircle" [size]="20" strokeWidth="2"></lucide-angular>
            <span class="font-display font-semibold text-dark-100">Currently Open to Opportunities</span>
          </div>
          <p class="text-dark-600 text-body max-w-2xl mx-auto">
            I'm actively seeking backend engineering roles where I can contribute to scalable systems, microservices architectures, and AI-integrated products. Whether it's a senior backend position, a lead role, or a challenging contract — let's talk.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a [href]="'mailto:' + siteConfig.email + '?subject=Opportunity:%20Backend%20Developer%20Role&body=Hi%20Abdur,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity...'">
              <ui-button variant="primary" size="md" label="Email Me About a Role" [iconRight]="ChevronRight" />
            </a>
            <a [href]="siteConfig.whatsappUrl" target="_blank" rel="noopener noreferrer">
              <ui-button variant="secondary" size="md" label="WhatsApp Me" [iconRight]="MessageSquare" />
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected siteConfig = siteConfig;
  protected Mail = Mail;
  protected Phone = Phone;
  protected MessageSquare = MessageSquare;
  protected Linkedin = Linkedin;
  protected Github = Github;
  protected MapPin = MapPin;
  protected Copy = Copy;
  protected Check = Check;
  protected CheckCircle = CheckCircle;
  protected ChevronRight = ChevronRight;

  copiedField = signal<string | null>(null);

  copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedField.set(field);
      setTimeout(() => this.copiedField.set(null), 2000);
    });
  }
}