import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService  {

  constructor(private _HttpClient: HttpClient) { }
  getallcategories():Observable<any> {
    return this._HttpClient.get(`${environment.baseurl}/api/v1/categories`);
  }

  getspeccategory(id:string | null):Observable<any> {
    return this._HttpClient.get(`${environment.baseurl}/api/v1/categories/${id}`);
  }
  getallspeccat():Observable<any> {
    return this._HttpClient.get(`${environment.baseurl}/api/v1/subcategories`);
  }
}
