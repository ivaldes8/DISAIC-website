import { Component, OnInit } from '@angular/core';

import { CardService } from '../../services/card.service';
import { ImageService } from '../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as AOS from 'aos';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  fetching = false;
  fetching2 = false;

  url = "contactoImageList";
  url2 = "contactoCardList";

  startList: [] = [];
  startList2: [] = [];

  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private imageService: ImageService,
    private toast: ToastrService,
     private cardService: CardService) { }

  ngOnInit(): void {
    AOS.init();
    this.fetchImages();
    this.fetchContacts();
  }

//image logic---------------------------------------------------------------------------

fetchImages(){
  this.fetching = true;
  this.imageService.getSlide(this.url).subscribe(data => {
    Object.assign(this.startList, data);
    this.fetching = false
  }, error => {
    console.log("image", error)
    this.toast.error("Error while getting images data")
  });
}


//contact logic------------------------------------------------------------------------------------

fetchContacts(){
  this.fetching2 = true;
    this.cardService.getCards(this.url2).subscribe(data => {
      Object.assign(this.startList2, data);
      this.fetching2 = false;
    }, error => {
      console.log("contacts",error);
      this.toast.error("Error while getting contacts data")
    });
}

}
