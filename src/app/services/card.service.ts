import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards(url:string){
    const dinamicUrl = url;
    return this.http.get(`${environment.API_DISAIC_URL}/${dinamicUrl}`).pipe(
      map(responseData => {
        const temaArray: any[] = [];
        for ( const key in responseData){
          if(responseData.hasOwnProperty(key)){
            temaArray.push({...responseData[key]});
          }
        }
        return temaArray;
      })
    )
   }

  postCard(data, url:string){
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    const dinamicUrl = url;
   return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}`,data, {headers:headers})
  }

  updateCard(data, url:string, id:number){
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    const dinamicUrl = url;
     return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`,data, {headers:headers})
  }

  deleteCard(id:number, url:string){
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    const dinamicUrl = url;
     return this.http.delete(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`, {headers:headers})
  }
}
