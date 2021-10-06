import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  getTemas(url:string){
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

  postTema(data, url:string){
    const dinamicUrl = url;
   return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}`,data)
  }

  updateTema(data, url:string, id:number){
    const dinamicUrl = url;
     return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`,data)
  }

  deleteTema(id:number, url:string){
    const dinamicUrl = url;
     return this.http.delete(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`)
  }

}
