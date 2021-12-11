import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { InformeService } from '../../../services/informe.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm:FormGroup;
  privateProducts;
  event: EventEmitter<any>=new EventEmitter();
  gestionar:string;
  url:string;
  obj = new FormData();
  filedata:any;

  constructor(private userService: UserService,private informeService: InformeService, private bsModalRef: BsModalRef) { }

  async ngOnInit(){
    this.userForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      role: new FormControl(null,Validators.required),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      productos: new FormControl(null)
    });

    this.privateProducts = await this.informeService.getPrivateProducts().toPromise();


    if(this.gestionar == "user"){
      this.url = "userRegister";
    }
  }

  onUserFormSubmit(){
    const data = {
      name:this.userForm.controls.name.value,
      email:this.userForm.controls.email.value,
      role:this.userForm.controls.role.value,
      products: this.userForm.controls.productos.value,
      password: this.userForm.controls.password.value
    }
    //console.log(this.url)
    this.userService.postUser(data,this.url).subscribe(data=>{
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
