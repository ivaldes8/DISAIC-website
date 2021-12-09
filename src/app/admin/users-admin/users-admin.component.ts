import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { AddUserComponent } from "../user/add-user/add-user.component";
import { DeleteUserComponent } from "../user/delete-user/delete-user.component";
import { EditUserComponent } from "../user/edit-user/edit-user.component";

import { UserService } from 'src/app/services/user.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  bsModalRef: BsModalRef;

  currentPage = 1;
  itemsPerPage = 5;
  startItem = 0;
  endItem = 5;
  fetching = false;

  startList: any[] = [];
  returnedArray: any[] = [];

  url = "getUsers";

  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private bsModalService: BsModalService,
    private toast: ToastrService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

   //User logic---------------------------------------------------------------------------

fetchUsers(){
  this.fetching = true;
  this.userService.getUsers(this.url).subscribe(data => {
    Object.assign(this.startList, data);
    this.returnedArray = this.startList.slice(0,this.itemsPerPage)
    this.fetching = false
  }, error => {
    console.log("image admin", error)
    this.toast.error("Error while getting images data admin")
  });
}

//CRUD IMAGE LOGIC-----------------------------------------------------------------------------

addUser(add: string){
  let initialState = {
    gestionar: add
  };
  this.bsModalRef = this.bsModalService.show(AddUserComponent,{initialState:initialState});
  this.bsModalRef.content.event.subscribe(result => {
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList = []
        this.fetchUsers();
        this.fetching = false;
      }, 5000);
    }
  });
}

deleteUser(id: number,name: string, email: string, role: string, del: string){
  let initialState = {
    gestionar: del
  };
  this.bsModalRef = this.bsModalService.show(DeleteUserComponent,{initialState:initialState});
  this.bsModalRef.content.id = id;
  this.bsModalRef.content.name = name;
  this.bsModalRef.content.email = email;
  this.bsModalRef.content.role = role;
  this.bsModalRef.content.event.subscribe(result => {
    //console.log("deleted", result);
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList = [];
        this.fetchUsers();
        this.fetching = false;
      }, 5000);
    }
  });
}

editUser(id: number, name:string, email: string, role: string, edit:string){
  let initialState = {
    name: name,
    email: email,
    role: role,
    id: id,
    gestionar: edit
  };
  this.bsModalRef = this.bsModalService.show(EditUserComponent,{initialState:initialState});
  this.bsModalRef.content.id = id;
  this.bsModalRef.content.name = name;
  this.bsModalRef.content.email = email;
  this.bsModalRef.content.role = role;
  this.bsModalRef.content.event.subscribe(result => {
    this.fetching= true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList = []
        this.fetchUsers();
        this.fetching = false;
      }, 5000);
    }
  });
}

//tables logic------------------------------------------------------------------------------------------------------

pageChanged(event:PageChangedEvent):void {
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
  this.returnedArray = this.startList.slice(startItem,endItem);
}

selectedItemsPerPage(event){
this.itemsPerPage = event.target.value;
this.startList = [];
this.returnedArray = [];
this.fetchUsers();
}

}
