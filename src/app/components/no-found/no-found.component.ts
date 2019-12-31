import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-no-found',
  templateUrl: './no-found.component.html',
  styleUrls: ['./no-found.component.css']
})
export class NoFoundComponent implements OnInit {

  constructor(
    private location:Location
  ) { }

  ngOnInit() {
    console.log(this.location.getState());
  }

}
