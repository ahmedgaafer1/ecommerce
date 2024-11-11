import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
private readonly _http=inject(HttpClient);
getallbrands(id:string =''):Observable<any> {
const url = id !== '' ? `${environment.baseurl}/api/v1/brands/${id}` : `${environment.baseurl}/api/v1/brands`;
return this._http.get(url);
}

}
