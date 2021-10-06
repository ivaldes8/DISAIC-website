export class User {
  constructor(private _token:string, private _token_validity:Date){}

  get token(){
    if(!this._token_validity || new Date() > this._token_validity){
      return null;
    }
    return this._token;
  }
}
