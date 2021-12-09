import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm:FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  gestionar:string;
  url:string;
  obj = new FormData();
  filedata:any;

  constructor(private userService: UserService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      role: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    });

    if(this.gestionar == "user"){
      this.url = "userRegister";
    }
  }

  onUserFormSubmit(){
    this.obj.append('name',this.userForm.controls.name.value);
    this.obj.append('email',this.userForm.controls.email.value);
    this.obj.append('role',this.userForm.controls.role.value);
    this.obj.append('password',this.userForm.controls.password.value);
    //console.log(this.url)
    this.userService.postUser(this.obj,this.url).subscribe(data=>{
      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
