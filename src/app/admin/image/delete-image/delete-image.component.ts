import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ImageService } from '../../../services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.css']
})
export class DeleteImageComponent implements OnInit {

  id: number;
  image:string;
  url:string;
  gestionar:string;
  event: EventEmitter<any> = new EventEmitter();
  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private bsModalRef: BsModalRef, private imageService: ImageService) { }

  ngOnInit(): void {
    if(this.gestionar == "firstCarousel"){
      this.url = "inicioCarouselDelete"
    }
    if(this.gestionar == "clientsCarousel"){
      this.url = "inicioClientDelete"
    }
    if(this.gestionar == "imageWho"){
      this.url = "nosotroImageDelete";
    }
    if(this.gestionar == "MVWho"){
      this.url = "nosotroMVDelete";
    }
    if(this.gestionar == "eventsWho"){
      this.url = "nosotroEventDelete";
    }
    if(this.gestionar == "imageContact"){
      this.url = "contactoImageDelete";
    }
    if(this.gestionar == "carouselTema"){
      this.url = "temaDelete";
    }
    if(this.gestionar == "promoUICI"){
      this.url = "promoUICIDelete";
    }
  }

  deleteClient(id){
    this.imageService.deleteSlide(id, this.url).toPromise();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
