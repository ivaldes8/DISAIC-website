import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { AddCardComponent } from "../card/add-card/add-card.component";
import { DeleteCardComponent } from "../card/delete-card/delete-card.component";
import { EditCardComponent } from "../card/edit-card/edit-card.component"

import { AddImageComponent } from "../image/add-image/add-image.component";
import { DeleteImageComponent } from "../image/delete-image/delete-image.component";
import { EditImageComponent } from "../image/edit-image/edit-image.component";

import { ImageService } from 'src/app/services/image.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CardService } from 'src/app/services/card.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-contacts-admin',
  templateUrl: './contacts-admin.component.html',
  styleUrls: ['./contacts-admin.component.css']
})
export class ContactsAdminComponent implements OnInit {

  bsModalRef: BsModalRef;

  currentPage = 1;
  itemsPerPage = 5;
  startItem = 0;
  endItem = 5;
  fetching = false;

  currentPage2 = 1;
  itemsPerPage2 = 5;
  startItem2 = 0;
  endItem2 = 5;
  fetching2 = false;

  startList: any[] = [];
  returnedArray: any[] = [];

  startList2: any[] = [];
  returnedArray2: any[] = [];

  url = "contactoImageList";
  url2 = "contactoCardList";

  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private bsModalService: BsModalService,
    private toast: ToastrService,
    private imageService: ImageService,
    private cardService: CardService) { }

  ngOnInit(): void {
    this.fetchImages();
    this.fetchContacts();
  }

   //image logic---------------------------------------------------------------------------

fetchImages(){
  this.fetching = true;
  this.imageService.getSlide(this.url).subscribe(data => {
    Object.assign(this.startList, data);
    this.returnedArray = this.startList.slice(0,this.itemsPerPage)
    this.fetching = false
  }, error => {
    console.log("image admin", error)
    this.toast.error("Error while getting images data admin")
  });
}


//contact logic------------------------------------------------------------------------------------

fetchContacts(){
  this.fetching2 = true;
    this.cardService.getCards(this.url2).subscribe(data => {
      Object.assign(this.startList2, data);
      this.returnedArray2 = this.startList2.slice(0,this.itemsPerPage2)
      this.fetching2 = false;
      if(this.returnedArray2.length == 0){
        this.fetching2 = true;
      }
    }, error => {
      console.log("contactsAdmin",error);
      this.toast.error("Error while getting contacts admin data")
    });
}

//CRUD IMAGE LOGIC-----------------------------------------------------------------------------

addImage(add: string){
  let initialState = {
    gestionar: add
  };
  this.bsModalRef = this.bsModalService.show(AddImageComponent,{initialState:initialState});
  this.bsModalRef.content.event.subscribe(result => {
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList = []
        this.fetchImages();
        this.fetching = false;
      }, 5000);
    }
  });
}

deleteImage(id: number, image: string, del: string){
  let initialState = {
    gestionar: del
  };
  this.bsModalRef = this.bsModalService.show(DeleteImageComponent,{initialState:initialState});
  this.bsModalRef.content.id = id;
  this.bsModalRef.content.image = image;
  this.bsModalRef.content.event.subscribe(result => {
    //console.log("deleted", result);
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList = [];
        this.fetchImages();
        this.fetching = false;
      }, 5000);
    }
  });
}

editImage(id: number, image:string, edit: string){
  let initialState = {
    image: image,
    id: id,
    gestionar: edit
  };
  this.bsModalRef = this.bsModalService.show(EditImageComponent,{initialState:initialState});
  this.bsModalRef.content.id = id;
  this.bsModalRef.content.image = image;
  this.bsModalRef.content.event.subscribe(result => {
    this.fetching= true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList = []
        this.fetchImages();
        this.fetching = false;
      }, 5000);
    }
  });
}

//CRUD CARD LOGIC------------------------------------------------------------------------------------

addCard(add:string){
  //console.log(add)
  let initialState = {
    add:add
  };
  this.bsModalRef = this.bsModalService.show(AddCardComponent,{initialState:initialState});
  this.bsModalRef.content.event.subscribe(result => {
    this.fetching2 = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList2 = [];
        this.fetchContacts();
        this.fetching2 = false;
      }, 5000);
    }
  });
}

deleteCard(id: number, title: string, description: string, del: string){
  let initialState = {
    delete: del
  };
  this.bsModalRef = this.bsModalService.show(DeleteCardComponent,{initialState:initialState});
  this.bsModalRef.content.id = id;
  this.bsModalRef.content.title = title;
  this.bsModalRef.content.description = description;
  this.bsModalRef.content.event.subscribe(result => {
    this.fetching2 = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList2 = [];
        this.fetchContacts();
        this.fetching2 = false;
      }, 5000);
    }
  });
}

editCard(id: number, title: string, description: string, image:string, edit:string){
  //console.log(id,title,title,description,image,edit,"1")
  let initialState = {
    title: title,
    description: description,
    id: id,
    image:image,
    edit: edit
  };
  this.bsModalRef = this.bsModalService.show(EditCardComponent,{initialState:initialState});
  this.bsModalRef.content.id = id;
  this.bsModalRef.content.title = title;
  this.bsModalRef.content.description = description;
  this.bsModalRef.content.image = image;
  this.bsModalRef.content.event.subscribe(result => {
    this.fetching2 = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList2 = [];
        this.fetchContacts();
        this.fetching2 = false;
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
this.fetchImages();
}

pageChanged2(event:PageChangedEvent):void {
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
  this.returnedArray2 = this.startList2.slice(startItem,endItem);
}

selectedItemsPerPage2(event){
this.itemsPerPage2 = event.target.value;
this.startList2 = [];
this.returnedArray2 = [];
this.fetchContacts();
}

}
