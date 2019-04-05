import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { observable, computed } from 'mobx-angular';

import { Door } from '../door';
import { DoorService } from '../door.service';
import { environment } from '../../../environments/environment';
import { OrderDialogComponent } from '../shared/order-dialog/order-dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  doors: Door[];
  door: Door;
  backendUrl: string;
  imgUrl: string = environment.imgUrl;
  @observable size: string;
  @observable openType: string = 'out';
  @observable count: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doorService: DoorService,
    public dialog: MatDialog
  ) {
    this.backendUrl = this.doorService.backendUrl;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getDoor();
      }
    });
    const q = this.route.snapshot.queryParams;
    this.size = q.sz || this.sizes[0].name;
    this.openType = q.ot || this.openType;
    this.count = q.ct || this.count;
  }

  setPath(): void {
    const q = this.route.snapshot.queryParams;
    if (
      q.sz == this.size &&
      q.ot == this.openType &&
      q.ct == this.count
    ) return;
    let qp = {
      sz: this.size,
      ot: this.openType,
      ct: this.count
    };
    this.router.navigate(['.'], { replaceUrl: true, relativeTo: this.route, queryParams: qp});
  }

  @computed get total() {
    this.setPath();
    let price = +this.door.price * +this.count;
    return price;
  }

  ngOnInit() {
  }
  openOrderDialog(): void {this.dialog.open(OrderDialogComponent);}
  
  getDoor(): void {
    const id = this.route.snapshot.paramMap.get('id').split('-')[0];
    if (this.door && +id == this.door.id) return; //don't reload if url params changed
    this.door = null; //scroll to top
    this.doorService.getDoor(id)
      .subscribe(door => {
        this.door = door;
        this.getDoors(door);
      });
  }
  getDoors(door: Door): void {
    const by = 'stuff';
    const id = door.stuffs[0].name;
    this.doors = [];
    this.doorService.getDoors(by, id)
      .subscribe(doors => {this.doors = doors;});
  }
  sizes: Size[] = [
    {name: '1800x800'},
    {name: '1900x800'},
    {name: '2030x800'},
    {name: '2050x860'},
    {name: '2050x960'},
    {name: '2100x1000'},
    {name: '2000x1200'},
    {name: '2000x1300'}
  ];
}

interface Size {
  name: string;
}