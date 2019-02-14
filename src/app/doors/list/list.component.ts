import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';


import { Door } from '../door';
import { DoorService } from '../door.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  doors: Door[];
  backendUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doorService: DoorService
  ) {
    this.backendUrl = this.doorService.backendUrl;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getDoors();
      }
    });
  }

  ngOnInit() {
  }

  getDoors(): void {
    const to = this.route.snapshot.paramMap.get('to');
    const id = this.route.snapshot.paramMap.get('id');
    this.doorService.getDoors(to, id)
      .subscribe(doors => {this.doors = doors});
  }

}
