import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import {provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {provideNzIcons} from "ng-zorro-antd/icon";

import {IconDefinition} from "@ant-design/icons-angular";

import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzIcons(icons),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, ...[
      withHashLocation(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ]), provideNzI18n(zh_CN), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
  ]
};
