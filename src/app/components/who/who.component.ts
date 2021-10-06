import { Component, OnInit } from '@angular/core';

import { CardService } from '../../services/card.service';
import { ImageService } from '../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as AOS from 'aos';

@Component({
  selector: 'app-who',
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.css']
})
export class WhoComponent implements OnInit {

  fetching = false;
  fetching2 = false;
  fetching3 = false;
  fetching4 = false;
  url = "nosotroImageList";
  url2 = "nosotroTextList";
  url3 = "nosotroMVList";
  url4 = "nosotroEventList";
  startList: [] = [];
  startList2: [] = [];
  startList3: [] = [];
  startList4: [] = [];
  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private imageService: ImageService,
    private toast: ToastrService,
     private cardService: CardService
    ) { }

  ngOnInit(): void {
    AOS.init();
    this.fetchImageCarousel();
    this.fetchText();
    this.fetchMV();
    this.fetchEvents();
  }

  //image logic---------------------------------------------------------------------------

fetchImageCarousel(){
  this.fetching = true;
  this.imageService.getSlide(this.url).subscribe(data => {
    Object.assign(this.startList, data);
    this.fetching = false
  }, error => {
    console.log("image", error)
    this.toast.error("Error while getting image data")
  });
}


//text logic------------------------------------------------------------------------------------

fetchText(){
  this.fetching2 = true;
    this.cardService.getCards(this.url2).subscribe(data => {
      Object.assign(this.startList2, data);
      this.fetching2 = false;
    }, error => {
      console.log("texts",error);
      this.toast.error("Error while getting texts data")
    });
}

//mision vision logic---------------------------------------------------------------------------

fetchMV(){
  this.fetching3 = true;
  this.imageService.getSlide(this.url3).subscribe(data => {
    Object.assign(this.startList3, data);
    this.fetching3 = false;
  }, error => {
    console.log("MV", error)
    this.toast.error("Error while getting MV data")
  });
}

//events logic---------------------------------------------------------------------------

fetchEvents(){
  this.fetching4 = true;
  this.imageService.getSlide(this.url4).subscribe(data => {
    Object.assign(this.startList4, data);
    this.fetching4 = false;
  }, error => {
    console.log("events", error)
    this.toast.error("Error while getting Events data");
  });
}


}
