import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CardService } from '../../../services/card.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-card-pdf',
  templateUrl: './edit-card-pdf.component.html',
  styleUrls: ['./edit-card-pdf.component.css']
})
export class EditCardPdfComponent implements OnInit {

  editCardForm: FormGroup;
  id: number;
  title: string;
  description:string;
  image:string;
  pdf:string;
  url:string;
  postData: any;
  edit:string;
  event: EventEmitter<any> = new EventEmitter();
  obj = new FormData();
  selectedImage : File;
  selectedPdf : File;
  imgUrl = environment.API_DISAIC_IMG_URL;
  pdfUrl = environment.API_DISAIC_PDF_URL;

  constructor(private cardService: CardService,private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.editCardForm = new FormGroup({
      titulo: new FormControl(null,Validators.required),
      descripcion: new FormControl(null)
    })
    this.editCardForm.controls['titulo'].setValue(this.title);
    this.editCardForm.controls['descripcion'].setValue(this.description);

    if(this.edit == "boletinCard"){
      this.url = "boletinUICIUpdate"
    }
  }

  fileEvent(e){
    this.selectedImage = <File>e.target.files[0];
  }

  fileEventPdf(e){
    this.selectedPdf = <File>e.target.files[0];
  }

  onEditFormSubmit() {
    this.obj.append('title',this.editCardForm.controls.titulo.value);
    //console.log(this.editTemaForm.controls.descripcion.value)
    if (this.editCardForm.controls.descripcion.value != null) {
      this.obj.append('description',this.editCardForm.controls.descripcion.value);
      //console.log(this.selectedImage,"OMG")
    }
    if (this.selectedImage != undefined) {
      this.obj.append('image', this.selectedImage, this.selectedImage.name)
    }
    if (this.selectedPdf != undefined) {
      this.obj.append('pdf', this.selectedPdf, this.selectedPdf.name)
    }
    this.cardService.updateCard(this.obj,this.url,this.id).subscribe(data => {
        this.event.emit('OK');
        this.bsModalRef.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
