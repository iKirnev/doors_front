import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems, Menu } from '../../../shared/menu-items/menu-items';
import { MenuService } from './menu.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  menu: Menu[];

  private _mobileQueryListener: () => void;
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  subclickEvent() {
    this.status = true;
  }
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private menuService: MenuService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.menuService.getMenu()
      .subscribe(data => {
        let stuffs = [];
        data.menu.stuffs.forEach(function(stuff) {
          stuffs.push({ state: `${stuff.name}`, name: `nav_left.stuff.${stuff.name}`, type: 'link' });
        });
        let uses = [];
        data.menu.uses.forEach(function(use) {
          uses.push({ state: `${use.name}`, name: `nav_left.use.${use.name}`, type: 'link' });
        });
        
        this.menu = [
          { state: 'doors/calculator', name: 'nav_left.doors_calculator', type: 'link', icon: 'business_center' },
          {
            state: '',
            name: 'nav_left.catalog',
            type: 'saperator',
            icon: 'av_timer'
          },  
          {
            state: 'doors/stuff',
            name: 'nav_left.by_stuff',
            type: 'sub',
            icon: 'format_color_fill',
            children: stuffs
          },
          {
            state: 'doors/use',
            name: 'nav_left.by_use',
            type: 'sub',
            icon: 'account_balance',
            children: uses
          }
        ];
      });
  }

}
