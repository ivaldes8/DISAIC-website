import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-delete-informe',
  templateUrl: './delete-informe.component.html',
  styleUrls: ['./delete-informe.component.css']
})
export class DeleteInformeComponent implements OnInit {

  id: number;
  title: string;
  description:string;
  delete:string
  event: EventEmitter<any> = new EventEmitter();
  gestionar:string;
  url:string;

  constructor(private bsModalRef: BsModalRef, private cardService:CardService) { }

  ngOnInit(): void {
    if(this.delete == "informe"){
      this.url = "informeDelete"
    }
  }

  async deleteGeneric(postId: number) {
    await this.cardService.deleteCard(postId, this.url).toPromise();
     this.event.emit('OK');
     this.bsModalRef.hide();
   }

   onClose() {
     this.bsModalRef.hide();
   }

}
