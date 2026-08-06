import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: 'i18n/', suffix: '.json' }),
      fallbackLang: 'fr',
      lang: 'fr',
    }),
  ],
};
