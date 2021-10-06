import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  getSlide(url:string){
    const dinamicUrl = url;
    return this.http.get(`${environment.API_DISAIC_URL}/${dinamicUrl}`)
   }

   postSlide(data, url:string){
      const headers = new HttpHeaders();
        headers.append('Content-Type','multipart/form-data');
        headers.append('Accept','application/json');
      const dinamicUrl = url;
      return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}`,data, {headers:headers})
  }

  updateSlide(data, url:string, id:number){
    const headers = new HttpHeaders();
      headers.append('Content-Type','multipart/form-data');
      headers.append('Accept','application/json');
    const dinamicUrl = url;
    return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`,data,{ headers: headers })
  }

  deleteSlide(id:number, url:string){
    const headers = new HttpHeaders();
      headers.append('Content-Type','multipart/form-data');
      headers.append('Accept','application/json');
    const dinamicUrl = url;
    return this.http.delete(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`,{ headers: headers })
  }

}
