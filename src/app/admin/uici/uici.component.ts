import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

// import { AddCardComponent } from "../card/add-card/add-card.component";
// import { DeleteCardComponent } from "../card/delete-card/delete-card.component";
// import { EditCardComponent } from "../card/edit-card/edit-card.component"

import { AddImageComponent } from "../image/add-image/add-image.component";
import { DeleteImageComponent } from "../image/delete-image/delete-image.component";
import { EditImageComponent } from "../image/edit-image/edit-image.component";
import { ImageService } from 'src/app/services/image.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-uici',
  templateUrl: './uici.component.html',
  styleUrls: ['./uici.component.css']
})
export class UiciComponent implements OnInit {

  bsModalRef: BsModalRef;

  currentPage = 1;
  itemsPerPage = 5;
  startItem = 0;
  endItem = 5;
  fetching = false;

  // currentPage2 = 1;
  // itemsPerPage2 = 5;
  // startItem2 = 0;
  // endItem2 = 5;
  // fetching2 = false;

  // currentPage3 = 1;
  // itemsPerPage3 = 5;
  // startItem3 = 0;
  // endItem3 = 5;
  // fetching3 = false;

  // currentPage4 = 1;
  // itemsPerPage4 = 5;
  // startItem4 = 0;
  // endItem4 = 5;
  // fetching4 = false;

  // currentPage5 = 1;
  // itemsPerPage5 = 5;
  // startItem5 = 0;
  // endItem5 = 5;
  // fetching5 = false;

  startList: any[] = [];
  returnedArray: any[] = [];

  // startList2: any[] = [];
  // returnedArray2: any[] = [];

  // startList3: any[] = [];
  // returnedArray3: any[] = [];

  // startList4: any[] = [];
  // returnedArray4: any[] = [];

  // startList5: any[] = [];
  // returnedArray5: any[] = [];

  url = "getPromoUICI";
  // url2 = "inicioThemesList";
  // url3 = "inicioOnSellList";
  // url4 = "inicioWhyList";
  // url5 = "getInicioClients";

  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private bsModalService: BsModalService,
     private toast: ToastrService,
     private imageService: ImageService,
     private cardService: CardService
      ) { }

  ngOnInit(): void {
    this.fetchFirstCarousel();
    // this.fetchThemes();
    // this.fetchShells();
    // this.fetchWhys();
    // this.fetchClients();
  }

//first carousel logic---------------------------------------------------------------------------

fetchFirstCarousel(){
  this.fetching = true;
  this.imageService.getSlide(this.url).subscribe(data => {
    Object.assign(this.startList, data);
    this.returnedArray = this.startList.slice(0,this.itemsPerPage)
    this.fetching = false
  }, error => {
    console.log("carousel admin", error)
    this.toast.error("Error while getting firstCarousel data admin")
  });
}

//themes logic------------------------------------------------------------------------------------

// fetchThemes(){
//   this.fetching2 = true;
//     this.cardService.getCards(this.url2).subscribe(data => {
//       Object.assign(this.startList2, data);
//       this.returnedArray2 = this.startList2.slice(0,this.itemsPerPage2)
//       this.fetching2 = false;
//       if(this.returnedArray2.length == 0){
//         this.fetching2 = true;
//       }
//     }, error => {
//       console.log("themesAdmin",error);
//       this.toast.error("Error while getting themes admin data")
//     });
// }

//On shell Products logic-------------------------------------------------------------------------

// fetchShells(){
//   this.fetching3 = true;
//   this.cardService.getCards(this.url3).subscribe(data => {
//     Object.assign(this.startList3, data);
//     this.returnedArray3 = this.startList3.slice(0,this.itemsPerPage3)
//     this.fetching3 = false;
//     if(this.returnedArray3.length == 0){
//       this.fetching3 = true;
//     }
//   }, error => {
//     console.log("onShellAdmin",error);
//     this.toast.error("Error while getting onShells admin data")
//   });
// }

//why os logic-------------------------------------------------------------------------------------

// fetchWhys(){
//   this.fetching4 = true;
//   this.cardService.getCards(this.url4).subscribe(data => {
//     Object.assign(this.startList4, data);
//     this.returnedArray4 = this.startList4.slice(0,this.itemsPerPage4)
//     this.fetching4 = false;
//     if(this.returnedArray4.length == 0){
//       this.fetching4 = true;
//     }
//   }, error => {
//     console.log("WhyAdmin",error);
//     this.toast.error("Error while getting Why admin data")
//   });
// }

//clients images logic-----------------------------------------------------------------------------

// fetchClients(){
//   this.fetching5 = true;
//     this.imageService.getSlide(this.url5).subscribe(data => {
//       Object.assign(this.startList5, data);
//       this.returnedArray5 = this.startList5.slice(0,this.itemsPerPage5)
//       this.fetching5 = false
//     }, error => {
//       console.log("fetchClientsAdmin", error)
//       this.toast.error("Error while getting fetchClients data admin")
//     });
// }

//CRUD IMAGE LOGIC-----------------------------------------------------------------------------

addImage(add: string){
  let initialState = {
    gestionar: add
  };
  this.bsModalRef = this.bsModalService.show(AddImageComponent,{initialState:initialState});
  this.bsModalRef.content.event.subscribe(result => {
    // this.fetching5= true;
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        // this.startList5 = []
        this.startList = []
        // this.fetchClients();
        this.fetchFirstCarousel();
        this.fetching = false;
        // this.fetching5 = false;
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
    // this.fetching5= true;
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        // this.startList5 = []
        this.startList = []
        // this.fetchClients();
        this.fetchFirstCarousel();
        this.fetching = false;
        // this.fetching5 = false;
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
    // this.fetching5= true;
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        // this.startList5 = []
        this.startList = []
        // this.fetchClients();
        this.fetchFirstCarousel();
        this.fetching = false;
        // this.fetching5 = false;
      }, 5000);
    }
  });
}

//CRUD CARD LOGIC------------------------------------------------------------------------------------

// addCard(add:string){
//   //console.log(add)
//   let initialState = {
//     add:add
//   };
//   this.bsModalRef = this.bsModalService.show(AddCardComponent,{initialState:initialState});
//   this.bsModalRef.content.event.subscribe(result => {
//     this.fetching2 = true;
//     this.fetching3 = true;
//     this.fetching4 = true;
//     if (result == 'OK') {
//       setTimeout(() => {
//         this.startList2 = [];
//         this.startList4 = [];
//         this.startList3 = [];
//         this.fetchThemes();
//         this.fetchShells();
//         this.fetchWhys();
//         this.fetching2 = false;
//         this.fetching4 = false;
//         this.fetching3 = false;
//       }, 5000);
//     }
//   });
// }

// deleteCard(id: number, title: string, description: string, del: string){
//   let initialState = {
//     delete: del
//   };
//   this.bsModalRef = this.bsModalService.show(DeleteCardComponent,{initialState:initialState});
//   this.bsModalRef.content.id = id;
//   this.bsModalRef.content.title = title;
//   this.bsModalRef.content.description = description;
//   this.bsModalRef.content.event.subscribe(result => {
//     this.fetching2 = true;
//     this.fetching4 = true;
//     this.fetching3 = true;
//     if (result == 'OK') {
//       setTimeout(() => {
//         this.startList2 = [];
//         this.startList4 = [];
//         this.startList3 = [];
//         this.fetchThemes();
//         this.fetchShells();
//         this.fetchWhys();
//         this.fetching2 = false;
//         this.fetching4 = false;
//         this.fetching3 = false;
//       }, 5000);
//     }
//   });
// }

// editCard(id: number, title: string, description: string, image:string, edit:string){
//   //console.log(id,title,title,description,image,edit,"1")
//   let initialState = {
//     title: title,
//     description: description,
//     id: id,
//     image:image,
//     edit: edit
//   };
//   this.bsModalRef = this.bsModalService.show(EditCardComponent,{initialState:initialState});
//   this.bsModalRef.content.id = id;
//   this.bsModalRef.content.title = title;
//   this.bsModalRef.content.description = description;
//   this.bsModalRef.content.image = image;
//   this.bsModalRef.content.event.subscribe(result => {
//     this.fetching2 = true;
//     this.fetching4 = true;
//     this.fetching3 = true;
//     if (result == 'OK') {
//       setTimeout(() => {
//         this.startList2 = [];
//         this.startList4 = [];
//         this.startList3 = [];
//         this.fetchThemes();
//         this.fetchShells();
//         this.fetchWhys();
//         this.fetching2 = false;
//         this.fetching4 = false;
//         this.fetching3 = false;
//       }, 5000);
//     }
//   });
// }

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
this.fetchFirstCarousel();
}

// pageChanged2(event:PageChangedEvent):void {
//   const startItem = (event.page - 1) * event.itemsPerPage;
//   const endItem = event.page * event.itemsPerPage;
//   this.returnedArray2 = this.startList2.slice(startItem,endItem);
// }

// selectedItemsPerPage2(event){
// this.itemsPerPage2 = event.target.value;
// this.startList2 = [];
// this.returnedArray2 = [];
// this.fetchThemes();
// }

// pageChanged3(event:PageChangedEvent):void {
//   const startItem = (event.page - 1) * event.itemsPerPage;
//   const endItem = event.page * event.itemsPerPage;
//   this.returnedArray3 = this.startList3.slice(startItem,endItem);
// }

// selectedItemsPerPage3(event){
// this.itemsPerPage3 = event.target.value;
// this.startList3 = [];
// this.returnedArray3 = [];
// this.fetchShells();
// }

// pageChanged4(event:PageChangedEvent):void {
//   const startItem = (event.page - 1) * event.itemsPerPage;
//   const endItem = event.page * event.itemsPerPage;
//   this.returnedArray4 = this.startList4.slice(startItem,endItem);
// }

// selectedItemsPerPage4(event){
// this.itemsPerPage4 = event.target.value;
// this.startList4 = [];
// this.returnedArray4 = [];
// this.fetchWhys();
// }

// pageChanged5(event:PageChangedEvent):void {
//   const startItem = (event.page - 1) * event.itemsPerPage;
//   const endItem = event.page * event.itemsPerPage;
//   this.returnedArray5 = this.startList5.slice(startItem,endItem);
// }

// selectedItemsPerPage5(event){
// this.itemsPerPage5 = event.target.value;
// this.startList5 = [];
// this.returnedArray5 = [];
// this.fetchClients();
// }

}
