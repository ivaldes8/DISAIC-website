import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as AOS from 'aos';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {

  fetching = false;

  startList : [] = []

  url = "getBoletinUICI";

  imgUrl = environment.API_DISAIC_IMG_URL;
  pdfUrl = environment.API_DISAIC_PDF_URL;

  constructor(private toast: ToastrService,
    private temaService: CardService,) { }

  ngOnInit(): void {
    AOS.init();
    this.fetchBoletines();
  }

  fetchBoletines(){
    this.fetching = true;
    if(this.url != ""){
      this.temaService.getCards(this.url).subscribe(data => {
        Object.assign(this.startList, data);
        this.fetching = false;
        if(this.startList.length == 0){
          this.fetching = true;
        }
      }, error => {
        console.log("Boletines Cards", error);
        this.toast.error("Error while getting boletin data")
      });
    }
  }

}
