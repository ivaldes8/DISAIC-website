import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService1 {

  constructor(private http:HttpClient) { }

  getItem(url:string){
   const dinamicUrl = url;
   return this.http.get(`${environment.API_DISAIC_URL}/${dinamicUrl}`);
  }

  getItemDescription(url:string, id: number){
    const dinamicUrl = url;
    return this.http.get(`${environment.API_DISAIC_URL}/${dinamicUrl}/${id}`);
  }
}

