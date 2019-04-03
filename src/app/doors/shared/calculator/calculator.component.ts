import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { StuffComponent, Stuff, STUFF_DATA } from './stuff/stuff.component';
import { observable, computed } from 'mobx-angular';
import { DoorService } from '../../door.service';
import { OrderDialogComponent } from '../../shared/order-dialog/order-dialog.component';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @observable width: number;
  widthMin: number = 650;
  widthMax: number = 3000;
  @observable height: number;
  heightMin: number = 1600;
  heightMax: number = 3000;
  @observable openType: string = 'out';
  @observable layout: Layout;
  @observable lockUp: number;
  @observable lockDown: number;
  @observable install: string;
  @observable delivery: string;
  @observable colorOut: number;
  @observable colorIn: number;
  @observable stuffOut: Stuff;
  @observable stuffIn: Stuff;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private doorService: DoorService,
    public dialog: MatDialog
  ) {
    const q = this.route.snapshot.queryParams;
    this.width = +q.w || this.widthMin;
    this.height = +q.h || this.heightMin;
    this.openType = q.ot || this.openType;
    this.layout = this.layouts.filter(el => el.symbol === q.lt)[0] || this.layouts[0];
    this.lockUp = +q.lu || this.locksUp[0].id;
    this.lockDown = +q.ld || this.locksDown[0].id;
    this.install = q.in || this.installs[0].symbol;
    this.delivery = q.de || this.deliveries[0].symbol;
    this.improvements.forEach(imp => imp.checked = +q[imp.symbol] == 1);
    this.stuffOut = STUFF_DATA.filter(st => st.symbol === q.so)[0];
    this.stuffIn = STUFF_DATA.filter(st => st.symbol === q.si)[0];
    this.colorOut = q.co;
    this.colorIn = q.ci;
    this.setDefaults();
  }

  setPath(): void {
    const q = this.route.snapshot.queryParams;
    if (
      +q.w == this.width && 
      +q.h == this.height &&
      q.ot == this.openType &&
      q.lt == this.layout.symbol &&
      +q.lu == this.lockUp &&
      +q.ld == this.lockDown &&
      q.in == this.install &&
      q.de == this.delivery &&
      this.improvements.filter(
        imp => (isNaN(q[imp.symbol]) && imp.checked || !isNaN(q[imp.symbol]) && !imp.checked)
      ).length == 0 &&
      q.so == (this.stuffOut && this.stuffOut.symbol) &&
      q.si == (this.stuffIn && this.stuffIn.symbol) &&
      q.co == this.colorOut &&
      q.ci == this.colorIn
    ) return;
    let qp = {
      w: this.width,
      h: this.height,
      ot: this.openType,
      lt: this.layout.symbol,
      lu: this.lockUp,
      ld: this.lockDown,
      in: this.install,
      de: this.delivery,
      so: this.stuffOut && this.stuffOut.symbol,
      si: this.stuffIn && this.stuffIn.symbol,
      co: this.colorOut,
      ci: this.colorIn,
    };
    this.improvements.forEach(function (imp) {
      if (imp.checked) qp[imp.symbol] = 1; 
    });
    this.router.navigate(['.'], { replaceUrl: true, relativeTo: this.route, queryParams: qp});
  }

  @computed get total() {
    this.setPath();
    if (!this.stuffOut || !this.stuffIn) return 0;
    let sq = this.width * this.height;
    if (sq < 1600000) sq = 1600000;
    let price = sq * this.stuffOut.price + sq * this.stuffIn.price //stuff
    price += this.openType == 'out' ? 0 : 500;
    this.improvements.forEach(imp => price += imp.checked ? imp.price : 0);
    price += this.locksUp.filter(lk => lk.id === this.lockUp)[0].price;
    price += this.locksDown.filter(lk => lk.id === this.lockDown)[0].price;
    price += this.installs.filter(sel => sel.symbol === this.install)[0].price;
    price += this.deliveries.filter(sel => sel.symbol === this.delivery)[0].price;
    return Math.floor(price);
  }

  ngOnInit() {
  }

  setDefaults(): void {
    if (this.width < this.widthMin) this.width = this.widthMin;
    if (this.width > this.widthMax) this.width = this.widthMax;
    if (this.height < this.heightMin) this.height = this.heightMin;
    if (this.height > this.heightMax) this.height = this.heightMax;
  }
  openOrderDialog(): void {this.dialog.open(OrderDialogComponent);}

  @observable improvements: Checkbox[] = [
    {symbol: 'ph', name: "peephole", checked: false, price: 200},
    {symbol: 'hr', name: "heater", checked: false, price: 800},
    {symbol: 'cr', name: "closer", checked: false, price: 2200},
    {symbol: 'ar', name: "armor", checked: false, price: 950}
  ]
  layouts: Layout[] = [
    {id: 0, symbol: 'b', name: 'base', size: '150px 270px'},
    {id: 1, symbol: 'bt', name: 'base_top', size: '124px 270px'},
    {id: 2, symbol: 'bs', name: 'base_side', size: '179px 270px'},
    {id: 3, symbol: 'bts', name: 'base_top_side', size: '154px 270px'},
    {id: 4, symbol: 'db', name: 'double_base', size: '250px 270px'},
    {id: 5, symbol: 'dbt', name: 'double_base_top', size: '204px 270px'}
  ];

  locksUp: Lock[] = [
    {id: 0, name: 'САМ 799', price: 0},
    {id: 1, name: 'Меттэм ЗВ8 160.0.0', price: 1500},
    {id: 2, name: 'Kale-189', price: 1800},
    {id: 3, name: 'Kale-257', price: 2400},
    {id: 4, name: 'Эльбор', price: 2500},
    {id: 5, name: 'Керберос-309', price: 7800},
    {id: 6, name: 'CISA 57.525', price: 7800},
    {id: 7, name: 'Mottura 52.783', price: 8800}
  ];

  locksDown: Lock[] = [
    {id: 0, name: 'САМ ЗВ 4-31/55', price: 0},
    {id: 1, name: 'Kale-252', price: 3800},
    {id: 2, name: 'Kale-352 с тягами', price: 4800},
    {id: 3, name: 'Страж', price: 2800},
    {id: 4, name: 'CISA 56.535', price: 8800},
    {id: 5, name: 'CISA 57.535', price: 6800},
    {id: 6, name: 'CISA 57.786', price: 14400},
    {id: 7, name: 'Mottura 54.797', price: 15500},
    {id: 8, name: 'Mottura 52.783', price: 8500}
  ];

  installs: Select[] = [
    {symbol: 'no', name: 'no', price: 0},
    {symbol: 'in', name: 'install', price: 2000},
    {symbol: 're', name: 'reinstall', price: 2700},
  ];

  deliveries: Select[] = [
    {symbol: 'no', name: 'no', price: 0},
    {symbol: 'mcad', name: 'mcad', price: 1500},
    {symbol: 'bmcad', name: 'behind_mcad', price: 2500},
  ];
}

interface Layout {
  id: number;
  name: string;
  symbol: string;
  size: string;
}

interface Lock {
  id: number;
  name: string;
  price: number;
}

interface Select {
  symbol: string;
  name: string;
  price: number;
}

interface Checkbox {
  symbol: string;
  name: string;
  checked: boolean;
  price: number;
}
