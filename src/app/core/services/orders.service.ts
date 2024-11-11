import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private _HttpClient:HttpClient) { }
  myheaders:any = {token :localStorage.getItem('usertoken')}
checkOut(id:string | null , shippingdetails:object):Observable<any> {
  return this._HttpClient.post(`${environment.baseurl}/api/v1/orders/checkout-session/${id}?url=${environment.localserver}`,
    {
      "shippingAddress":shippingdetails
    },
    {
      headers:this.myheaders
    }
  )
}
getuserorders(id:string):Observable<any> {
  return this._HttpClient.get(`${environment.baseurl}/api/v1/orders/user/${id}`,
    {
      headers:this.myheaders

    }
  )
}

}
