import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  id: number;
  name: String;
  email: String;
  role: String;
  url:string;
  gestionar:string;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private userService: UserService) { }

  ngOnInit(): void {
    if(this.gestionar == "user"){
      this.url = "userDelete"
    }
  }

  deleteClient(id){
    this.userService.deleteUser(id, this.url).toPromise();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
