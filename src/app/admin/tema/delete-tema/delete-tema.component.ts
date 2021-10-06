import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TemaService } from '../../../services/tema.service';

@Component({
  selector: 'app-delete-tema',
  templateUrl: './delete-tema.component.html',
  styleUrls: ['./delete-tema.component.css']
})
export class DeleteTemaComponent implements OnInit {

  id: number;
  title: string;
  description:string;
  delete:string
  event: EventEmitter<any> = new EventEmitter();
  gestionar:string;
  url:string;

  constructor(private bsModalRef: BsModalRef, private temaService:TemaService) { }

  ngOnInit(): void {
    if(this.delete == "producto"){
      this.url = "productoDelete"
    }
    if(this.delete == "servicio"){
      this.url = "serviceDelete"
    }
    if(this.delete == "entrenamiento"){
      this.url = "trainingDelete"
    }
  }

  async deleteGeneric(postId: number) {
    await this.temaService.deleteTema(postId, this.url).toPromise();
     this.event.emit('OK');
     this.bsModalRef.hide();
   }

   onClose() {
     this.bsModalRef.hide();
   }

}
