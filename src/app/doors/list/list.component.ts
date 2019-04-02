import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';


import { Door } from '../door';
import { DoorService } from '../door.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  doors: Door[];
  backendUrl: string;
  imgUrl: string = environment.imgUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doorService: DoorService
  ) {
    this.backendUrl = this.doorService.backendUrl;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getDoors();
        const contentContainer = document.querySelector('.mat-sidenav-content') || window;
        contentContainer.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
  }

  getDoors(): void {
    const by = this.route.snapshot.paramMap.get('by');
    const id = this.route.snapshot.paramMap.get('id');
    this.doorService.getDoors(by, id)
      .subscribe(doors => {this.doors = doors});
  }

}
