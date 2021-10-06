import { Component, OnInit } from '@angular/core';
import { TemaService } from '../../services/tema.service';

import { faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

import { AddTemaComponent } from './add-tema/add-tema.component';
import { DeleteTemaComponent } from './delete-tema/delete-tema.component';
import { EditTemaComponent } from './edit-tema/edit-tema.component';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  startList: any[] = [];
  returnedArray: any[] = [];

  startList2: any[] = [];
  returnedArray2: any[] = [];

  startList3: any[] = [];
  returnedArray3: any[] = [];

  bsModalRef: BsModalRef;

  faEdit = faEdit;
  faTrash = faTrash;
  faSpinner = faSpinner;

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

  currentPage3 = 1;
  itemsPerPage3 = 5;
  startItem3 = 0;
  endItem3 = 5;
  fetching3 = false;

  gestionar = "1";
  url = "productList/1";
  url2 = "serviceList/1";
  url3 = "trainingList/1";
  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private temaService: TemaService,
    private bsModalService: BsModalService,
     private toast: ToastrService,) { }

  ngOnInit(): void {
    this.fetchProd();
    this.fetchServ();
    this.fetchTrain();
  }

  fetchProd(){
    this.fetching = true;
    if(this.url != ""){
      this.temaService.getTemas(this.url).subscribe(data => {
        Object.assign(this.startList, data);
        this.returnedArray = this.startList.slice(0,this.itemsPerPage)
        this.fetching = false;
        if(this.returnedArray.length == 0){
          this.fetching = true;
        }
      }, error => {
        console.log("productosAdmin", error)
        this.toast.error("Error while getting productos admin data")
      });
    }
  }

  fetchServ(){
    this.fetching2 = true;
    this.temaService.getTemas(this.url2).subscribe(data => {
      Object.assign(this.startList2, data);
      this.returnedArray2 = this.startList2.slice(0,this.itemsPerPage2)
      this.fetching2 = false;
      if(this.returnedArray2.length == 0){
        this.fetching2 = true;
      }
    }, error => {
      console.log("serviciosAdmin", error)
      this.toast.error("Error while getting servicios admin data")
    });
  }

  fetchTrain(){
    this.startList3 = [];
    this.returnedArray3 = [];
    this.fetching3 = true;
    this.temaService.getTemas(this.url3).subscribe(data => {
      Object.assign(this.startList3, data);
      this.returnedArray3 = this.startList3.slice(0,this.itemsPerPage3)
      this.fetching3 = false;
      if(this.returnedArray3.length == 0){
        this.fetching3 = true;
      }
    }, error => {
      console.log("entrenamientosAdmin", error)
      this.toast.error("Error while getting entrenamientos Admin data")
    });
  }

  //Crud Tema Logic -------------------------------------------------------------------------------------

  addTema(add:string){
    //console.log(add)
    let initialState = {
      gestionar: this.gestionar,
      add:add
    };
    this.bsModalRef = this.bsModalService.show(AddTemaComponent,{initialState:initialState});
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }
    });
  }

  deleteTema(id: number, title: string, description: string, del: string){
    let initialState = {
      gestionar: this.gestionar,
      delete: del
    };
    this.bsModalRef = this.bsModalService.show(DeleteTemaComponent,{initialState:initialState});
    this.bsModalRef.content.id = id;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.description = description;
    this.bsModalRef.content.event.subscribe(result => {
      this.fetching = true;
      this.fetching2 = true;
      this.fetching3 = true;
      if (result == 'OK') {
        setTimeout(() => {
          this.startList = [];
          this.startList2 = [];
          this.startList3 = [];
          this.fetchProd();
          this.fetchServ();
          this.fetchTrain();
          this.fetching = false;
          this.fetching2 = false;
          this.fetching3 = false;
        }, 5000);
      }
    });
  }

  editTema(id: number, title: string, description: string, edit:string){
    //console.log(id,title,title,description,image,edit,"1")
    let initialState = {
      title: title,
      description: description,
      id: id,
      gestionar: this.gestionar,
      edit: edit
    };
    this.bsModalRef = this.bsModalService.show(EditTemaComponent,{initialState:initialState});
    this.bsModalRef.content.id = id;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.description = description;
    this.bsModalRef.content.event.subscribe(result => {
      this.fetching = true;
      this.fetching2 = true;
      this.fetching3 = true;
      if (result == 'OK') {
        setTimeout(() => {
          this.startList = [];
          this.startList2 = [];
          this.startList3 = [];
          this.fetchProd();
          this.fetchServ();
          this.fetchTrain();
          this.fetching = false;
          this.fetching2 = false;
          this.fetching3 = false;
        }, 5000);
      }
    });
  }

//Table logic -----------------------------------------------------------------------------------------

pageChanged(event:PageChangedEvent):void {
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
  this.returnedArray = this.startList.slice(startItem,endItem);
}

selectedItemsPerPage(event){
this.itemsPerPage = event.target.value;
this.startList = [];
this.returnedArray = [];
this.fetchProd();
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
this.fetchServ();
}

pageChanged3(event:PageChangedEvent):void {
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
  this.returnedArray3 = this.startList3.slice(startItem,endItem);
}

selectedItemsPerPage3(event){
this.itemsPerPage3 = event.target.value;
this.startList3 = [];
this.returnedArray3 = [];
this.fetchTrain();
}

//URL LOgics--------------------------------------------------------------------------------------------

  selectedItem(event){
  const selected = event.target.value;
  this.gestionar = selected;
      if(selected == "1"){
        this.url = "productList/1";
        this.url2 = "serviceList/1";
        this.url3 = "trainingList/1";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

      if(selected == "2"){
        this.url = "productList/2";
        this.url2 = "serviceList/2";
        this.url3 = "trainingList/2";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

      if(selected == "3"){
        this.url = "productList/3";
        this.url2 = "serviceList/3";
        this.url3 = "trainingList/3";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

      if(selected == "4"){
        this.url = "productList/4";
        this.url2 = "serviceList/4";
        this.url3 = "trainingList/4";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

      if(selected == "5"){
        this.url = "productList/5";
        this.url2 = "serviceList/5";
        this.url3 = "trainingList/5";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

      if(selected == "6"){
        this.url = "productList/6";
        this.url2 = "serviceList/6";
        this.url3 = "trainingList/6";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

      if(selected == "7"){
        this.url = "productList/7";
        this.url2 = "serviceList/7";
        this.url3 = "trainingList/7";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

      if(selected == "8"){
        this.url = "productList/8";
        this.url2 = "serviceList/8";
        this.url3 = "trainingList/8";
        this.startList = [];
        this.returnedArray = [];
        this.startList2 = [];
        this.returnedArray2 = [];
        this.startList3 = [];
        this.returnedArray3 = [];
        this.fetchProd();
        this.fetchServ();
        this.fetchTrain();
      }

  }
}
