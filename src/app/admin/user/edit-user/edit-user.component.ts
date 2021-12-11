import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { InformeService } from '../../../services/informe.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

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

  productos;
  privateProducts;
  userForm:FormGroup;
  obj = new FormData();
  event: EventEmitter<any>=new EventEmitter();
  gestionar:string;
  url:string;
  filedata:any;
  fetching = false;

  constructor(private userService: UserService,private informeService: InformeService,private toast: ToastrService, private bsModalRef: BsModalRef) { }

  async ngOnInit() {
    this.fetching = true;
    this.userForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      role: new FormControl(null,Validators.required),
      productos: new FormControl(null)
    });

    this.productos = await this.userService.getProductosByUsers(this.id).toPromise();
    this.privateProducts = await this.informeService.getPrivateProducts().toPromise();

    let aux = []
    this.productos.map(item => {
      aux.push(item.id.toString())
      this.userForm.controls['productos'].setValue(aux);
    })

    this.userForm.controls['name'].setValue(this.name);
    this.userForm.controls['email'].setValue(this.email);
    this.userForm.controls['role'].setValue(this.role);

    this.fetching = false;

    if(this.gestionar == "user"){
      this.url = "userUpdate";
    }
  }

  onEditUserSubmit() {
    const data = {
      name:this.userForm.controls.name.value,
      email:this.userForm.controls.email.value,
      role:this.userForm.controls.role.value,
      products: this.userForm.controls.productos.value
    }
    this.userService.updateUser(data,this.url,this.id).subscribe(data => {
        this.event.emit('OK');
        this.bsModalRef.hide();
    });
  }
  onClose(){
    this.bsModalRef.hide();
  }

}
