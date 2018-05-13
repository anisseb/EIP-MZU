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
  public NetworkId: any;
  public FbAccessToken: any;
  public FbSecret: any;
  public Match: any;

  public TwitterSecret: any;
  public NetworkIdTwitter: any;
  public TwitterAccessToken: any;

  public GoogleSecret: any;
  public NetworkIdGoogle: any;
  public GoogleAccessToken: any;
  public PicURL: any;


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


  ServiceAPI(id){
    console.log(id);
    return this.http.get('http://martinpras.eu/get_data/twitter/twitter.php?user_id='+ id);
    
    
  }


  getMatchbyUser(id){
    return this.http.get('http://martinpras.eu/meetzemup/match/getbyuser/'+ id);
  }


  updateUser(data)
  {
    return this.http.post('http://martinpras.eu/meetzemup/user/update/'+ this.UserId, data)
  }

}
