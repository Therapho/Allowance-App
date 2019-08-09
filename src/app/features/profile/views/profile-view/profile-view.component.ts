import { Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/core/stores/user.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  constructor(
    public userStore: UserStore,
    public accountStore: AccountStore,
    public lookupStore: LookupStore
  ) { }

  ngOnInit() {
  }

}
