import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  profile = null;
  showUsers = false;
  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.profile = await this.userService.getProfile().toPromise();
    if(this.profile.role < 1){
      this.showUsers = true
    }
  }

}
