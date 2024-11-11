import { Component, inject, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { OrdersService } from '../../core/services/orders.service';
import { Iallprod } from '../../core/interfaces/iallprod';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe ,CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  userdata:any=null;
  allordersprod:Iallprod[]= [];
  private readonly _OrdersService= inject(OrdersService)
  cartId:string='';
  ngOnInit():void {if(localStorage.getItem('usertoken') !== null){
    this.userdata =jwtDecode(localStorage.getItem('usertoken') ! )
    console.log("userdataa :" , this.userdata);
    this.cartId= this.userdata.id;

    this._OrdersService.getuserorders(this.cartId).subscribe({
      next:(res)=>{
console.log(res);
this.allordersprod = res;
console.log("allorderprod" ,this.allordersprod);
      },
      error:(err)=>{
console.log(err);
      }
    })
  }
  }

}
