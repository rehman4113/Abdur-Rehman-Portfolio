import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Github, Linkedin, Mail, Phone, MapPin, MessageSquare } from 'lucide-angular';
import { ButtonComponent } from '../../ui/button/button';
import { siteConfig } from '../../../../core/data/site.config';

@Component({
  selector: 'layout-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  template: `
    <footer class="bg-dark-975 border-t border-dark-800" role="contentinfo">
      <div class="container-custom py-16 md:py-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div class="md:col-span-1">
            <a routerLink="/" class="font-display font-bold text-2xl gradient-text mb-4 inline-block">
              Abdur Rehman
            </a>
            <p class="text-dark-400 text-body leading-relaxed mb-6 max-w-xs">
              Backend Developer specializing in Spring Boot, Microservices, and AI-integrated systems. Building scalable solutions from Islamabad, Pakistan.
            </p>
            <div class="flex flex-wrap gap-4">
              <a
                [href]="siteConfig.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                class="p-3 rounded-xl bg-dark-900 text-dark-400 hover:text-primary-500 hover:bg-dark-800 transition-all duration-300"
              >
                <lucide-angular [img]="Github" [size]="20" strokeWidth="2"></lucide-angular>
              </a>
              <a
                [href]="siteConfig.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="p-3 rounded-xl bg-dark-900 text-dark-400 hover:text-primary-500 hover:bg-dark-800 transition-all duration-300"
              >
                <lucide-angular [img]="Linkedin" [size]="20" strokeWidth="2"></lucide-angular>
              </a>
              <a
                [href]="siteConfig.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                class="p-3 rounded-xl bg-dark-900 text-dark-400 hover:text-green-500 hover:bg-dark-800 transition-all duration-300"
              >
                <lucide-angular [img]="MessageSquare" [size]="20" strokeWidth="2"></lucide-angular>
              </a>
              <a
                [href]="'mailto:' + siteConfig.email"
                aria-label="Email"
                class="p-3 rounded-xl bg-dark-900 text-dark-400 hover:text-primary-500 hover:bg-dark-800 transition-all duration-300"
              >
                <lucide-angular [img]="Mail" [size]="20" strokeWidth="2"></lucide-angular>
              </a>
            </div>
          </div>

          <div class="md:col-span-1">
            <h3 class="font-display font-semibold text-dark-100 mb-6">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul class="space-y-3">
                <li><a href="#about" class="text-dark-400 hover:text-primary-500 transition-colors">About Me</a></li>
                <li><a href="#experience" class="text-dark-400 hover:text-primary-500 transition-colors">Experience</a></li>
                <li><a href="#work" class="text-dark-400 hover:text-primary-500 transition-colors">Projects</a></li>
                <li><a href="#contact" class="text-dark-400 hover:text-primary-500 transition-colors">Contact</a></li>
              </ul>
            </nav>
          </div>

          <div class="md:col-span-1">
            <h3 class="font-display font-semibold text-dark-100 mb-6">Connect</h3>
            <div class="space-y-4">
              <a
                [href]="'mailto:' + siteConfig.email"
                class="flex items-center gap-3 p-3 rounded-xl bg-dark-900 hover:bg-dark-800 transition-all duration-300 group"
              >
                <div class="p-2 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <lucide-angular [img]="Mail" [size]="18" strokeWidth="2"></lucide-angular>
                </div>
                <div>
                  <p class="text-caption text-dark-500">Email</p>
                  <p class="text-body-sm text-dark-100">{{ siteConfig.email }}</p>
                </div>
              </a>
              <a
                [href]="siteConfig.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-xl bg-dark-900 hover:bg-dark-800 transition-all duration-300 group"
              >
                <div class="p-2 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <lucide-angular [img]="MessageSquare" [size]="18" strokeWidth="2"></lucide-angular>
                </div>
                <div>
                  <p class="text-caption text-dark-500">WhatsApp</p>
                  <p class="text-body-sm text-dark-100">{{ siteConfig.phone }}</p>
                </div>
              </a>
              <a
                [href]="siteConfig.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-xl bg-dark-900 hover:bg-dark-800 transition-all duration-300 group"
              >
                <div class="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <lucide-angular [img]="Linkedin" [size]="18" strokeWidth="2"></lucide-angular>
                </div>
                <div>
                  <p class="text-caption text-dark-500">LinkedIn</p>
                  <p class="text-body-sm text-dark-100">Connect with me</p>
                </div>
              </a>
              <div class="flex items-center gap-3 p-3 rounded-xl bg-dark-900">
                <div class="p-2 rounded-lg bg-dark-700 text-dark-400">
                  <lucide-angular [img]="MapPin" [size]="18" strokeWidth="2"></lucide-angular>
                </div>
                <div>
                  <p class="text-caption text-dark-500">Location</p>
                  <p class="text-body-sm text-dark-100">{{ siteConfig.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-dark-500 text-body-sm">
            &copy; {{ currentYear }} Abdur Rehman. All rights reserved.
          </p>
          <p class="text-dark-500 text-body-sm">
            Built with Angular, Tailwind CSS & lots of coffee
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected siteConfig = siteConfig;
  protected Github = Github;
  protected Linkedin = Linkedin;
  protected Mail = Mail;
  protected Phone = Phone;
  protected MapPin = MapPin;
  protected MessageSquare = MessageSquare;
  protected currentYear = new Date().getFullYear();
}