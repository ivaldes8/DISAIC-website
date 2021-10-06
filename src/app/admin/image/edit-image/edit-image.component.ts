import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { ImageService } from '../../../services/image.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  id: number;
  image: string;

  imageForm:FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  gestionar:string;
  url:string;
  filedata:any;
  selectedImage: File;
  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private clientService: ImageService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      image: new FormControl(null,Validators.required),
    });

    if(this.gestionar == "firstCarousel"){
      this.url = "inicioCarouselUpdate";
    }
    if(this.gestionar =="clientsCarousel"){
      this.url = "inicioClientUpdate";
    }
    if(this.gestionar == "imageWho"){
      this.url = "nosotroImageUpdate";
    }
    if(this.gestionar == "MVWho"){
      this.url = "nosotroMVUpdate";
    }
    if(this.gestionar == "eventsWho"){
      this.url = "nosotroEventUpdate";
    }
    if(this.gestionar == "imageContact"){
      this.url = "contactoImageUpdate";
    }
    if(this.gestionar == "carouselTema"){
      this.url = "temaUpdate";
    }
  }

  onEditImageSubmit() {
    const fd = new FormData();
    fd.append('image', this.selectedImage, this.selectedImage.name)

    this.clientService.updateSlide(fd,this.url,this.id).subscribe(data=>{
      if(data!=null){
        //console.log(data,"xdios")
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  fileEvent(e){
    this.selectedImage = <File>e.target.files[0];
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
