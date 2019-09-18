import { Component, OnInit } from '@angular/core';
import { BusyService } from 'src/app/core/services/busy-service/busy.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    public busy: BusyService
  ) { }

  ngOnInit() {
  }

}
