import { Component, OnInit } from '@angular/core';

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

  constructor(private doorService: DoorService) {
    this.backendUrl = this.doorService.backendUrl;
  }

  ngOnInit() {
    this.getDoors();
  }

  getDoors(): void {
    this.doorService.getDoors()
      .subscribe(doors => {this.doors = doors});
  }

}
