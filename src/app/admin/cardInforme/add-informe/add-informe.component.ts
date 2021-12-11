import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { CardService } from '../../../services/card.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-informe',
  templateUrl: './add-informe.component.html',
  styleUrls: ['./add-informe.component.css']
})
export class AddInformeComponent implements OnInit {

  informeForm:FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  selectedImage: File;
  selectedPdf: File;
  add:string;
  url:string;
  obj = new FormData();

  constructor(private cardService: CardService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.informeForm = new FormGroup({
      titulo: new FormControl(null,Validators.required),
      descripcion: new FormControl(null),
      isPublic: new FormControl(true),
    });

      if(this.add == "informe"){
        this.url = "informeRegister"
      }
  }

  onCardFormSubmit(){
    this.obj.append('title',this.informeForm.controls.titulo.value);
    this.obj.append('isPublic',this.informeForm.controls.isPublic.value);
    if (this.informeForm.controls.descripcion.value != null) {
      this.obj.append('description',this.informeForm.controls.descripcion.value);
    }
    if (this.selectedImage != undefined) {
      this.obj.append('image', this.selectedImage, this.selectedImage.name)
    }
    if (this.selectedPdf != undefined) {
      this.obj.append('pdf', this.selectedPdf, this.selectedPdf.name)
    }

  this.cardService.postCard(this.obj,this.url).subscribe(data=>{
    if(data!=null){
      this.event.emit('OK');
      this.bsModalRef.hide();
    }
  });
}

fileEvent(e){
  this.selectedImage = <File>e.target.files[0];
}

fileEventPdf(e){
  this.selectedPdf = <File>e.target.files[0];
}

onClose(){
  this.bsModalRef.hide();
}

}
