import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(url:string){
    const dinamicUrl = url;
    return this.http.get(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}`).pipe(
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

   getProductosByUsers(id){
    const dinamicUrl = 'auth/getProductoByUser'
    return this.http.get(`${environment.API_DISAIC_URL}/${dinamicUrl}/${id}`);
   }

  postUser(data, url:string){
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    const dinamicUrl = url;
   return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}`,data, {headers:headers})
  }

  getProfile(){
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    const dinamicUrl = 'profile';
    return this.http.get(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}`, {headers:headers})
  }

  updateUser(data, url:string, id:number){
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    const dinamicUrl = url;
     return this.http.post(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`,data, {headers:headers})
  }

  deleteUser(id:number, url:string){
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    const dinamicUrl = url;
     return this.http.delete(`${environment.API_DISAIC_URL}/auth/${dinamicUrl}/${id}`, {headers:headers})
  }
}
