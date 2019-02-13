import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';

export const DoorsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
];
