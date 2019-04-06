import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService, private titleService: Title) {
    translate.setDefaultLang('ru');
    let title = this.translate.instant('doors.order-dialog.sent');
    this.setTitle( 'Металлические двери');
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
