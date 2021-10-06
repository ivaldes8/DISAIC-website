import { Component, OnInit } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { ImageService } from '../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  fetching = false;
  fetching2 = false;
  fetching3 = false;
  fetching4 = false;
  noData = false;
  noData2 = false;
  noData3 = false;
  url = 'productList/1';
  url2 = 'serviceList/1';
  url3 = 'trainingList/1';
  url4 = 'temaList';
  startList: [] = [];
  startList2: [] = [];
  startList3: [] = [];
  startList4: [] = [];
  imgUrl = environment.API_DISAIC_IMG_URL;

  constructor(private temaService: TemaService,  private toast: ToastrService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.fetchProd();
    this.fetchServ();
    this.fetchTrain();
    this.fetchTemaCarousel();
  }

  // tslint:disable-next-line:typedef
  fetchProd(){
    this.fetching = true;
    if (this.url !== ''){
      this.temaService.getTemas(this.url).subscribe(data => {
        Object.assign(this.startList, data);
        this.fetching = false;
        if (this.startList.length === 0){
          this.noData = true;
        }
        // console.log(data)
      }, error => {
        console.log('product', error);
        this.toast.error('Error while getting products data');
      });
    }
  }

  // tslint:disable-next-line:typedef
  fetchServ(){
    this.fetching2 = true;
    this.temaService.getTemas(this.url2).subscribe(data => {
      Object.assign(this.startList2, data);
      this.fetching2 = false;
      if (this.startList2.length === 0){
        this.noData2 = true;
      }
      // console.log(data)
    }, error => {
      console.log('service', error);
      this.toast.error('Error while getting services data');
    });
  }

  // tslint:disable-next-line:typedef
  fetchTrain(){
    this.fetching3 = true;
    this.temaService.getTemas(this.url3).subscribe(data => {
      Object.assign(this.startList3, data);
      this.fetching3 = false;
      if (this.startList3.length === 0){
        this.noData3 = true;
      }
    }, error => {
      console.log('training', error);
      this.toast.error('Error while getting training data');
    });
  }

    // first carousel logic---------------------------------------------------------------------------

// tslint:disable-next-line:typedef
fetchTemaCarousel(){
  this.fetching4 = true;
  this.imageService.getSlide(this.url4).subscribe(data => {
    Object.assign(this.startList4, data);
    this.fetching4 = false;
  }, error => {
    console.log('carouselTema', error);
    this.toast.error('Error while getting carouselTema data');
  });
}

}
