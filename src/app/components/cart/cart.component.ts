import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icart } from '../../core/interfaces/icart';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { CartService } from './../../core/services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink , NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
cartdetails:Icart = {} as Icart ;
  private readonly _CartService = inject(CartService);
  private readonly _SweetalertService = inject(SweetalertService)
  cartnumbof:WritableSignal<number>=signal(this._CartService.countnum());

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
    if(this._CartService.countnum() > 0) {
      this._CartService.ClearallData().subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message="success" ) {
            this._SweetalertService.showSuccessTopEnd(res.message )
  this.cartdetails = {} as Icart ;
  this._CartService.countnum.set(0);
  this.cartnumbof.set(0);
  
          }
        },
        error:(err)=>{
          console.log(err);
  
        }
      })
    }
    else {
      this._SweetalertService.errorAlert('The cart is empty')

    }
   
  }
  showMessage(): void {
    this._SweetalertService.errorAlert("Your cart is empty. Please add items to your cart before proceeding with the order.");
  }
}
