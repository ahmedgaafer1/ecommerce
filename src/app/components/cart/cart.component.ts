import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
cartdetails:Icart = {} as Icart ;
  private readonly _CartService = inject(CartService);
  private readonly _SweetalertService = inject(SweetalertService)
  ngOnInit(): void {
      this._CartService.getproductscart().subscribe({
        next:(res)=>{
console.log(res.data);
this.cartdetails = res.data ;
        },
        error:(err)=>{
console.log(err);
        }
      })
  }
  deleteproduct(id:string):void {
    this._SweetalertService.showalert("Are you sure u want to delete this item from your cart ?",'Your item has been deleted.',()=>{
      this._CartService.removeproductscart(id).subscribe({
        next:(res)=>{
  console.log(res);
  this.cartdetails = res.data ;
  this._CartService.countnum.set(res.numOfCartItems);
        },
        error:(err)=>{
  console.log(err);
        }
      })
    });
  }
  updateproducts(id:string , count:number) {
    this._CartService.updateproductscart(id , count).subscribe({
      next:(res)=>{
console.log(res.data);
this._SweetalertService.showSuccessTopEnd('Cart edited successfully!');
this.cartdetails = res.data ;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  Clearcartdata():void {
    this._CartService.ClearallData().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message="success" ) {
          this._SweetalertService.showSuccessTopEnd(res.message )
this.cartdetails = {} as Icart ;
this._CartService.countnum.set(0);

        }
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
