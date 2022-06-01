import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient){
  }

  apply_token(){
    let auth_token = "auth_token";
    const headers = {'Content-type':'application/json',  'Authorization': 'Bearer ' + auth_token};
    const body = JSON.stringify({data: {token:"auth_token"}});
      this.http.post(environment.apiUrl + "gettoken", body, {'headers':headers}).subscribe((reply:any)=>{
        if(reply.data.status == "success")
        {
          localStorage.setItem("auth_token", reply.data.token);
        }
      });
  }

  post(api:string, data:any){
    let auth_token = localStorage.getItem("auth_token");
    const headers = {'Content-type':'application/json',  'Authorization': 'Bearer ' + auth_token};
    const body = JSON.stringify({data: data});
    return this.http.post(environment.apiUrl + api, body, {'headers':headers});
  }
}
