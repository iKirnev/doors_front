import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})

export class StuffComponent implements OnInit {
  @Output() onChange = new EventEmitter();
  @Input() layout: any;
  @Input() stuff: Stuff;
  @Input() color: number;
  name: string;
  stuffOver: boolean;

  constructor(private _sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit() {
    this.stuffOver = this.stuff == null;
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StuffDialogComponent, {
      width: '950px',
      data: { name: this.name, stuff: this.stuff }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stuff = result;
        this.color = 1;
      }
      this.onChange.emit({stuff: this.stuff, color: this.color});
    });
  }
  onColorChange(color): void {
    this.color = color;
    this.onChange.emit({stuff: this.stuff, color: this.color});
  }
  onMouseOut(evt): void {
    this.stuffOver = (false || this.stuff == null || evt.target.id == "outsideFacing");
    if(!this.stuffOver) console.log(evt);
  }
}




@Component({
  selector: 'stuff-dialog',
  templateUrl: './stuff-dialog.html',
  styleUrls: ['./stuff-dialog.css']
})
export class StuffDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StuffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    breakpointObserver: BreakpointObserver
  ) {
  }
  displayedColumns = ['name', 'price', 'design', 'strength'];
  dataSource = new MatTableDataSource<Stuff>(STUFF_DATA);
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSelectStuff(stuff: Stuff): void {
    this.dialogRef.close(stuff); 
  }
}

export interface Stuff {
  name: string;
  symbol: string;
  priceRate: number;
  design: number;
  strength: number;
  price: number;
}

export const STUFF_DATA: Stuff[] = [
  {symbol: 'c', name: 'colored', priceRate: 1, design: 1, strength: 4, price: 0.00335},
  {symbol: 'p', name: 'powder', priceRate: 1, design: 4, strength: 5, price: 0.00565},
  {symbol: 'vl', name: 'vinilis_leather', priceRate: 1, design: 1, strength: 1, price: 0.00265},
  {symbol: 'm', name: 'mdf', priceRate: 4, design: 4, strength: 4, price: 0.00765},
  {symbol: 'l', name: 'laminat', priceRate: 1, design: 2, strength: 3, price: 0.00415},
  {symbol: 's', name: 'stejaris', priceRate: 5, design: 5, strength: 4, price: 0.02415},
];
