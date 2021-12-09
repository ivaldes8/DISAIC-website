import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { CardService } from '../../../services/card.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-card-pdf',
  templateUrl: './add-card-pdf.component.html',
  styleUrls: ['./add-card-pdf.component.css']
})
export class AddCardPdfComponent implements OnInit {

  cardForm:FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  selectedImage: File;
  selectedPdf: File;
  add:string;
  url:string;
  obj = new FormData();

  constructor(private cardService: CardService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      titulo: new FormControl(null,Validators.required),
      descripcion: new FormControl(null),
    });

      if(this.add == "boletinCard"){
        this.url = "boletinUICIRegister"
      }
  }

  onCardFormSubmit(){

    this.obj.append('title',this.cardForm.controls.titulo.value);
    //console.log(this.TemaForm.controls.descripcion.value)
    if (this.cardForm.controls.descripcion.value != null) {
      this.obj.append('description',this.cardForm.controls.descripcion.value);
      //console.log(this.selectedImage,"OMG")
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
