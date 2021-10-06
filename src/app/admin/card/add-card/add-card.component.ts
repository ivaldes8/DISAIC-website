import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { CardService } from '../../../services/card.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  cardForm:FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  selectedImage: File;
  add:string;
  url:string;
  obj = new FormData();

  constructor(private cardService: CardService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      titulo: new FormControl(null,Validators.required),
      descripcion: new FormControl(null),
    });

      if(this.add == "theme"){
        this.url = "inicioThemeRegister"
      }
      if(this.add == "sell"){
        this.url = "inicioOnSellRegister"
      }
      if(this.add == "why"){
        this.url = "inicioWhyRegister"
      }
      if(this.add == "textWho"){
        this.url = "nosotroTextRegister"
      }
      if(this.add == "contactsContact"){
        this.url = "contactoCardRegister"
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

onClose(){
  this.bsModalRef.hide();
}

}
