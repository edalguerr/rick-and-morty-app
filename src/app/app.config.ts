import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideDialogConfig } from '@ngneat/dialog';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore } from '@ngrx/store';
import { favoritesReducer } from './state/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(TranslateModule.forRoot()),
    provideHttpClient(withFetch()),
    provideDialogConfig({}),
    provideClientHydration(),
    provideStore(),
    importProvidersFrom(StoreModule.forRoot({ favorites: favoritesReducer })),
  ],
};
