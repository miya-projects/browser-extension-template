import { Routes } from '@angular/router';
import {PopupComponent} from "./popup/popup.component";
import {OptionsComponent} from "./options/options.component";
import {SidePanelComponent} from "./side-panel/side-panel.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'popup',
    pathMatch: 'full'
  },
  {
    path: 'popup',
    component: PopupComponent
  },
  {
    path: 'options',
    component: OptionsComponent
  },
  {
    path: 'side-panel',
    component: SidePanelComponent
  }
];
