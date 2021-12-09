import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id: number;
  name: string;
  email: string;
  role: string;

  userForm:FormGroup;
  obj = new FormData();
  event: EventEmitter<any>=new EventEmitter();
  gestionar:string;
  url:string;
  filedata:any;

  constructor(private userService: UserService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      role: new FormControl(null,Validators.required)
    });

    this.userForm.controls['name'].setValue(this.name);
    this.userForm.controls['email'].setValue(this.email);
    this.userForm.controls['role'].setValue(this.role);

    if(this.gestionar == "user"){
      this.url = "userUpdate";
    }
  }

  onEditUserSubmit() {
    this.obj.append('name',this.userForm.controls.name.value);
    this.obj.append('email',this.userForm.controls.email.value);
    this.obj.append('role',this.userForm.controls.role.value);
    this.userService.updateUser(this.obj,this.url,this.id).subscribe(data => {
        this.event.emit('OK');
        this.bsModalRef.hide();
    });
  }
  onClose(){
    this.bsModalRef.hide();
  }

}
