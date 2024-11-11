import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor( private _HttpClient:HttpClient) { }
//  countnum:BehaviorSubject<number> =new BehaviorSubject(0);
countnum:WritableSignal<number>=signal(0);
  
  addproductTocart(id:string):Observable<any> {
return this._HttpClient.post(`${environment.baseurl}/api/v1/cart` ,
  {
  "productId" : id 
} 
);
  }
  getproductscart():Observable<any> {
   return this._HttpClient.get(`${environment.baseurl}/api/v1/cart`
    )
  }
  removeproductscart(id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseurl}/api/v1/cart/${id}` )
   }
  updateproductscart(id:string , countnum:number):Observable<any> {
    return this._HttpClient.put(`${environment.baseurl}/api/v1/cart/${id}` , {
      "count":countnum 
    } )
  }
  ClearallData():Observable<any> {
    return this._HttpClient.delete(`${environment.baseurl}/api/v1/cart`)
  }
}
