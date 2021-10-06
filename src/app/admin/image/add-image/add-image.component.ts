import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { ImageService } from '../../../services/image.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  imageForm:FormGroup;
  selectedImage: File;
  event: EventEmitter<any>=new EventEmitter();
  gestionar:string;
  url:string;
  obj;
  filedata:any;

  constructor(private imageService: ImageService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      image: new FormControl(null,Validators.required),
    });

    if(this.gestionar == "firstCarousel"){
      this.url = "inicioCarouselRegister";
    }
    if(this.gestionar == "clientsCarousel"){
      this.url = "inicioClientRegister";
    }
    if(this.gestionar == "imageWho"){
      this.url = "nosotroImageRegister";
    }
    if(this.gestionar == "MVWho"){
      this.url = "nosotroMVRegister";
    }
    if(this.gestionar == "eventsWho"){
      this.url = "nosotroEventRegister";
    }
    if(this.gestionar == "imageContact"){
      this.url = "contactoImageRegister";
    }
    if(this.gestionar == "carouselTema"){
      this.url = "temaRegister";
    }
    //console.log(this.url)
  }

  fileEvent(e){
    this.selectedImage = <File>e.target.files[0];
  }

  onImageFormSubmit(){
    const fd = new FormData();
    fd.append('image', this.selectedImage, this.selectedImage.name)
    //console.log(this.url)
    this.imageService.postSlide(fd,this.url).subscribe(data=>{
      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
