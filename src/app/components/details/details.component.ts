import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
private readonly _ProductsService =inject(ProductsService);
private readonly _CartService =inject(CartService);
private readonly _ToastrService =inject(ToastrService);
private readonly _ActivatedRoute = inject(ActivatedRoute);
specproduct:Iproducts | null =null ;
getalldetailsssub!: Subscription;

idproduct:string='';
speccarousel: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({ 
        next:(p)=> {
this.idproduct =p.get('id')!;
this.getalldetailsssub=this._ProductsService.getspecificproducts(this.idproduct).subscribe({
  next:(d)=>{
this.specproduct=d.data;
console.log(this.specproduct);
  }, 
  error:(err)=>{
console.log(err);
  }
}) ;

        }
      })
  }

  ngOnDestroy(): void {
 this.getalldetailsssub.unsubscribe();
  }
  addcart():void {
    this._CartService.addproductTocart(this.idproduct).subscribe({
      next:(res)=>{
  console.log(res);
  this._ToastrService.success(res.message , 'FreshCart')
  this._CartService.countnum.set(res.numOfCartItems);
  }
  })
  }
}
