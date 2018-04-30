import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceVarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceVarProvider {
  public UserId: any;
  public UserInfo: any;
  public FbAccessToken: any;
  public FbSecret: any;
  public TwitterSecret: any;
  public NetworkId: any;
  public TwitterAccessToken: any;

  constructor(private http: HttpClient) {
 
  }

  getUser(id) {
  	return this.http.get('http://martinpras.eu/meetzemup/user/get/' + id);
  }

  createUser(data) {
  	return this.http.post('http://martinpras.eu/meetzemup/user/create', data);
  }

  addToken(form)
  {
    return this.http.post('http://martinpras.eu/meetzemup/token/create', form);
  }

  updateUser(data)
  {
    console.log(this.UserId);
    return this.http.post('http://martinpras.eu/meetzemup/user/update/'+ this.UserId, data)
  }

}
