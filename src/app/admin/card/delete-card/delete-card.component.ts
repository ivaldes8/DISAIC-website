import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent implements OnInit {

  id: number;
  title: string;
  description:string;
  delete:string
  event: EventEmitter<any> = new EventEmitter();
  gestionar:string;
  url:string;

  constructor(private bsModalRef: BsModalRef, private cardService:CardService) { }

  ngOnInit(): void {
    if(this.delete == "theme"){
      this.url = "inicioThemeDelete"
    }
    if(this.delete == "sell"){
      this.url = "inicioOnSellDelete"
    }
    if(this.delete == "why"){
      this.url = "inicioWhyDelete"
    }
    if(this.delete == "textWho"){
      this.url = "nosotroTextDelete"
    }
    if(this.delete== "contactsContact"){
      this.url = "contactoCardDelete"
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
