import { Component, OnInit } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-component6',
  templateUrl: './component6.component.html',
  styleUrls: ['./component6.component.css']
})
export class Component6Component implements OnInit {

  fetching = false;
  fetching2 = false;
  fetching3 = false;
  fetching4 = false;
  noData = false;
  noData2 = false;
  noData3 = false;
  url = "productList/6";
  url2 = "serviceList/6";
  url3 = "trainingList/6";
  url4 = "temaList";
  startList : [] = [];
  startList2 : [] = [];
  startList3 : [] = [];
  startList4 : [] = [];
  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private temaService: TemaService,  private toast: ToastrService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.fetchProd();
    this.fetchServ();
    this.fetchTrain();
    this.fetchTemaCarousel();
  }

  fetchProd(){
    this.fetching = true;
    if(this.url != ""){
      this.temaService.getTemas(this.url).subscribe(data => {
        Object.assign(this.startList, data);
        this.fetching = false;
        if(this.startList.length == 0){
          this.noData= true;
        }
        //console.log(data)
      }, error => {
        this.toast.error("Error while getting products data")
      });
    }
  }

  fetchServ(){
    this.fetching2 = true;
    this.temaService.getTemas(this.url2).subscribe(data => {
      Object.assign(this.startList2, data);
      this.fetching2 = false;
      if(this.startList2.length == 0){
        this.noData2 = true;
      }
      //console.log(data)
    }, error => {
      this.toast.error("Error while getting services data")
    });
  }

  fetchTrain(){
    this.fetching3 = true;
    this.temaService.getTemas(this.url3).subscribe(data => {
      Object.assign(this.startList3, data);
      this.fetching3 = false;
      if(this.startList3.length == 0){
        this.noData3 = true;
      }
    }, error => {
      this.toast.error("Error while getting training data")
    });
  }

      //first carousel logic---------------------------------------------------------------------------

fetchTemaCarousel(){
  this.fetching4 = true;
  this.imageService.getSlide(this.url4).subscribe(data => {
    Object.assign(this.startList4, data);
    this.fetching4 = false
  }, error => {
    console.log("carouselTema", error)
    this.toast.error("Error while getting carouselTema data")
  });
}
}
