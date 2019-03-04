import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DoorsRoutes } from './doors.routing';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ListComponent } from './list/list.component';
import { CalculatorPageComponent } from './calculator/calculator.component';
import { CalculatorComponent } from './shared/calculator/calculator.component';
import { StuffComponent, StuffDialogComponent} from './shared/calculator/stuff/stuff.component';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    ChartsModule,
    RouterModule.forChild(DoorsRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
  ],
  entryComponents: [StuffDialogComponent],
  declarations: [
    ListComponent,
    CalculatorPageComponent,
    CalculatorComponent,
    StuffComponent,
    StuffDialogComponent,
  ]
})
export class DoorsModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}