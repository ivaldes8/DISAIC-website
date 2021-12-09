import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-delete-card-pdf',
  templateUrl: './delete-card-pdf.component.html',
  styleUrls: ['./delete-card-pdf.component.css']
})
export class DeleteCardPdfComponent implements OnInit {

  id: number;
  title: string;
  description:string;
  delete:string
  event: EventEmitter<any> = new EventEmitter();
  gestionar:string;
  url:string;

  constructor(private bsModalRef: BsModalRef, private cardService:CardService) { }

  ngOnInit(): void {
    if(this.delete == "boletinCard"){
      this.url = "boletinUICIDelete"
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
