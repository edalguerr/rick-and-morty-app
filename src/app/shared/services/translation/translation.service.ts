import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILocale } from '../../interfaces/locale';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLang = 'en';
  isBrowser = false;

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.translateService.setDefaultLang(this.getDefaultLanguage());
    this.isBrowser = isPlatformBrowser(platformId);
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
      if (this.isBrowser) localStorage.setItem('lang', lang);
      return;
    }

    this.translateService.use(this.getSelectedLanguage());
    if (this.isBrowser) localStorage.setItem('lang', this.getSelectedLanguage());
  }

  getSelectedLanguage(): string {
    return this.isBrowser
      ? localStorage.getItem('lang') || this.translateService.getDefaultLang()
      : this.translateService.getDefaultLang();
  }

  getDefaultLanguage(): string {
    const browserLang = this.translateService.getBrowserLang();

    if (this.isBrowser) {
      return (
        localStorage.getItem('lang') ||
        (browserLang?.match(/en|es/) ? browserLang : this.defaultLang)
      );
    }

    return browserLang?.match(/en|es/) ? browserLang : this.defaultLang;
  }
}
