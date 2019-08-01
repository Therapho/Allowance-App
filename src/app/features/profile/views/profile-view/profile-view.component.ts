import { Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/core/services/user-store/user-store';
import { AccountStore } from 'src/app/core/services/account-store/account-store';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  constructor(
    public userStore: UserStore,
    public accountStore: AccountStore,
  ) { }

  ngOnInit() {
  }

}
