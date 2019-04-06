import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../shared/calculator/calculator.component';
import {TranslateService} from '@ngx-translate/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorPageComponent implements OnInit {

  constructor(private translate: TranslateService, private titleService: Title) { }

  ngOnInit() {
    let title = this.translate.instant('nav_left.doors_calculator');
    this.setTitle(title);
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
