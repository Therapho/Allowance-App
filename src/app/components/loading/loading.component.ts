import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BusyService } from 'src/app/core/services/busy-service/busy.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],


})
export class LoadingComponent implements OnInit {

  color = 'white';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;


  constructor(
    private loaderService: BusyService
  ) { }

  ngOnInit() {
  }

}
