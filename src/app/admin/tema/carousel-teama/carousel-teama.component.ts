import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { AddImageComponent } from "../../image/add-image/add-image.component";
import { DeleteImageComponent } from "../../image/delete-image/delete-image.component";
import { EditImageComponent } from "../../image/edit-image/edit-image.component";
import { ImageService } from 'src/app/services/image.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-carousel-teama',
  templateUrl: './carousel-teama.component.html',
  styleUrls: ['./carousel-teama.component.css']
})
export class CarouselTeamaComponent implements OnInit {

  bsModalRef: BsModalRef;

  currentPage = 1;
  itemsPerPage = 5;
  startItem = 0;
  endItem = 5;
  fetching = false;

  startList: any[] = [];
  returnedArray: any[] = [];

  url = "temaList";

  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private bsModalService: BsModalService,
    private toast: ToastrService,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.fetchTemaCarousel();
  }

  //first carousel logic---------------------------------------------------------------------------

fetchTemaCarousel(){
  this.fetching = true;
  this.imageService.getSlide(this.url).subscribe(data => {
    Object.assign(this.startList, data);
    this.returnedArray = this.startList.slice(0,this.itemsPerPage)
    this.fetching = false
  }, error => {
    console.log("carouselTema admin", error)
    this.toast.error("Error while getting carouselTema data admin")
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
        this.fetchTemaCarousel();
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
        this.startList = []
        this.fetchTemaCarousel();
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
    this.fetching = true;
    if (result == 'OK') {
      setTimeout(() => {
        this.startList = []
        this.fetchTemaCarousel();
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
this.fetchTemaCarousel();
}

}
