import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { CardService } from '../../services/card.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as AOS from 'aos';

@Component({
  selector: 'app-uici',
  templateUrl: './uici.component.html',
  styleUrls: ['./uici.component.css'],
})

export class UiciComponent implements OnInit {

  fetching = false;
  fetching2 = false;
  // fetching3 = false;
  // fetching4 = false;
  // fetching5 = false;

  startList : [] = []
  startList2 : [] = []
  // startList3 : [] = []
  // startList4 : [] = []
  // startList5 : [] = []

  url = "getPromoUICI";
  url2 = "getPromoCardUICI";
  // url4 = "inicioOnSellList";
  // url3 = "inicioWhyList";
  // url5 = "getInicioClients";
  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private toast: ToastrService,
     private carouselService: ImageService,
     private temaService: CardService,
    ) { }

  ngOnInit(): void {
    AOS.init();
    this.fetchPromo();
    this.fetchPromoCard();
    // this.fetchTemas();
    // this.fetchWhys();
    // this.fetchOnShells();
    // this.fetchClients();
  }

  fetchPromo(){
    this.fetching = true;
      this.carouselService.getSlide(this.url).subscribe(data => {
        Object.assign(this.startList, data);
        this.fetching = false
      }, error => {
        console.log("Promo Carousel", error);
        this.toast.error("Error while getting main carousel data");
      });
  }

  fetchPromoCard(){
    this.fetching2 = true;
    if(this.url2 != ""){
      this.temaService.getCards(this.url2).subscribe(data => {
        Object.assign(this.startList2, data);
        this.fetching2 = false;
        if(this.startList2.length == 0){
          this.fetching2 = true;
        }
      }, error => {
        console.log("Promo Cards", error);
        this.toast.error("Error while getting temas data")
      });
    }
  }

  // fetchOnShells(){
  //   this.fetching4 = true;
  //   if(this.url4 != ""){
  //     this.temaService.getCards(this.url4).subscribe(data => {
  //       Object.assign(this.startList4, data);
  //       this.fetching4 = false;
  //       if(this.startList4.length == 0){
  //         this.fetching4 = true;
  //       }
  //     }, error => {
  //       console.log("On Shell", error);
  //       this.toast.error("Error while getting on shells data")
  //     });
  //   }
  // }

  // fetchWhys(){
  //   this.fetching3 = true;
  //   if(this.url3 != ""){
  //     this.temaService.getCards(this.url3).subscribe(data => {
  //       Object.assign(this.startList3, data);
  //       this.fetching3 = false;
  //       if(this.startList3.length == 0){
  //         this.fetching3 = true;
  //       }
  //     }, error => {
  //       console.log("Why", error);
  //       this.toast.error("Error while getting whys data")
  //     });
  //   }
  // }

  // fetchClients(){
  //   this.fetching5 = true;
  //     this.carouselService.getSlide(this.url5).subscribe(data => {
  //       Object.assign(this.startList5, data);
  //       this.fetching5 = false
  //     }, error => {
  //       console.log("Clients", error);
  //       this.toast.error("Error while getting clients data");
  //     });
  // }

}
