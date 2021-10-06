import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { TemaService } from '../../../services/tema.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-tema',
  templateUrl: './add-tema.component.html',
  styleUrls: ['./add-tema.component.css']
})
export class AddTemaComponent implements OnInit {

  TemaForm:FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  gestionar:string;
  add:string;
  url:string;
  obj = new FormData();

  constructor(private temaService: TemaService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.TemaForm = new FormGroup({
      titulo: new FormControl(null,Validators.required),
      descripcion: new FormControl(null),
    });

      if(this.add == "producto"){
        this.url = "productRegister"
      }
      if(this.add == "servicio"){
        this.url = "serviceRegister"
      }
      if(this.add == "entrenamiento"){
        this.url = "trainingRegister"
      }
      //console.log(this.gestionar)
      //console.log(this.url)
  }

  onTemaFormSubmit(){

    this.obj.append('title',this.TemaForm.controls.titulo.value);
    this.obj.append('item', this.gestionar);
    //console.log(this.TemaForm.controls.descripcion.value)
    if (this.TemaForm.controls.descripcion.value != null) {
      this.obj.append('description',this.TemaForm.controls.descripcion.value);
      //console.log(this.selectedImage,"OMG")
    }


    this.temaService.postTema(this.obj,this.url).subscribe(data=>{
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
