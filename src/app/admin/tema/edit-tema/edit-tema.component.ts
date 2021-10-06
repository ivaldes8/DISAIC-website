import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TemaService } from '../../../services/tema.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-tema',
  templateUrl: './edit-tema.component.html',
  styleUrls: ['./edit-tema.component.css']
})
export class EditTemaComponent implements OnInit {

  editTemaForm: FormGroup;
  categories: any[] = [];
  id: number;
  title: string;
  description:string;
  image:string;
  gestionar:string;
  url:string;
  edit:string;
  event: EventEmitter<any> = new EventEmitter();
  obj = new FormData();

  constructor(private temaService: TemaService,private bsModalRef: BsModalRef) {
    this.editTemaForm = new FormGroup({
      titulo: new FormControl(null,Validators.required),
      descripcion: new FormControl(null)
    })
   }

   onEditFormSubmit() {

    this.obj.append('title',this.editTemaForm.controls.titulo.value);
    this.obj.append('item', this.gestionar);
    //console.log(this.editTemaForm.controls.descripcion.value)
    if (this.editTemaForm.controls.descripcion.value != null) {
      this.obj.append('description',this.editTemaForm.controls.descripcion.value);
      //console.log(this.selectedImage,"OMG")
    }
    this.temaService.updateTema(this.obj,this.url,this.id).subscribe(data => {
        this.event.emit('OK');
        this.bsModalRef.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit(): void {
    //console.log(this.id,this.title,this.title,this.description,this.image,this.edit,"2")
    this.editTemaForm.controls['titulo'].setValue(this.title);
    this.editTemaForm.controls['descripcion'].setValue(this.description);

    if(this.edit == "producto"){
      this.url = "productUpdate"
    }
    if(this.edit == "servicio"){
      this.url = "serviceUpdate"
    }
    if(this.edit == "entrenamiento"){
      this.url = "trainingUpdate"
    }
  }

}
