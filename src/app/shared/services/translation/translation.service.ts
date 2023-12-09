import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILocale } from '../../interfaces/locale';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLang = 'en';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.getDefaultLanguage());
  }

  loadTranslations(...locales: ILocale[]): void {
    let langIds: any[] = [];

    locales.forEach((locale) => {
      this.translateService.setTranslation(locale.lang, locale);
      langIds = [...langIds, locale.lang];
    });
    this.translateService.addLangs(langIds);
  }

  setLanguage(lang: string): void {
    if (lang) {
      this.translateService.use(lang);
      localStorage.setItem('lang', lang);
      return;
    }

    this.translateService.use(this.getSelectedLanguage());
    localStorage.setItem('lang', this.getSelectedLanguage());
  }

  getSelectedLanguage(): string {
    return (
      localStorage.getItem('lang') || this.translateService.getDefaultLang()
    );
  }

  getDefaultLanguage(): string {    
    const browserLang = this.translateService.getBrowserLang();
    return (
      localStorage.getItem('lang') ||
      (browserLang?.match(/en|es/) ? browserLang : this.defaultLang)
    );
  }
}
