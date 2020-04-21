import { timeout } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.css']
})
export class SessionExpiredComponent implements OnInit {

  timeout: any;
  constructor(
    private globalService: GlobalService
  ) {
    this.timeout = globalService.timeout;
  }

  ngOnInit() {
  }

}
