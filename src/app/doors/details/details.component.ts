import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';


import { Door } from '../door';
import { DoorService } from '../door.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  doors: Door[];
  door: Door = new Door();
  backendUrl: string;
  imgUrl: string = environment.imgUrl;
  size: string = '1800x800';
  openType: string = 'out';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doorService: DoorService
  ) {
    this.backendUrl = this.doorService.backendUrl;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getDoor();
        const contentContainer = document.querySelector('.mat-sidenav-content') || window;
        contentContainer.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
  }

  getDoor(): void {
    const id = this.route.snapshot.paramMap.get('id').split('-')[0];
    this.doorService.getDoor(id)
      .subscribe(door => {
        this.door = door;
        this.getDoors(door);
      });
  }
  getDoors(door: Door): void {
    const by = 'stuff';
    const id = door.stuffs[0].name;
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