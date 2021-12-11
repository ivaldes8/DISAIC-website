import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as AOS from 'aos';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  fetching = false;
  noData = false;

  startList : [] = []

  url = "getPublicProducts";

  imgUrl = environment.API_DISAIC_IMG_URL;
  pdfUrl = environment.API_DISAIC_PDF_URL;

  constructor(private toast: ToastrService,
    private temaService: CardService,) { }

  ngOnInit(): void {
    AOS.init();
    this.fetchInformes();
  }

  fetchInformes(){
    this.fetching = true;
    if(this.url != ""){
      this.temaService.getCards(this.url).subscribe(data => {
        Object.assign(this.startList, data);
        this.fetching = false;
        if(this.startList.length == 0){
          this.noData = true;
        }
      }, error => {
        console.log("Informes ", error);
        this.toast.error("Error while getting Informes data")
      });
    }
  }

}
