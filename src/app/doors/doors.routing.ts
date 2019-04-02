import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CalculatorPageComponent } from './calculator/calculator.component';

export const DoorsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':by/:id',
        component: ListComponent
      },
      {
        path: 'calculator',
        component: CalculatorPageComponent
      },
      {
        path: ':id',
        component: DetailsComponent
      }
    ]
  }
];
