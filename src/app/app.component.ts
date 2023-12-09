import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import esLang from '../assets/i18n/es';
import enLang from '../assets/i18n/en';
import { TranslationService } from './shared/services/translation/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  title = 'rick-and-morty';
  constructor(translationService: TranslationService) {
    translationService.loadTranslations(esLang, enLang);
  }
}
