import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Ibrand1 } from '../../core/interfaces/ibrand1';
import { TrimtextPipe } from '../../core/pipes/trimtext.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branddetails',
  standalone: true,
  imports: [RouterLink , TrimtextPipe],
  templateUrl: './branddetails.component.html',
  styleUrl: './branddetails.component.scss'
})
export class BranddetailsComponent implements OnInit  {
  private readonly _ProductsService= inject(ProductsService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService);
  private readonly _ActivatedRoute= inject(ActivatedRoute);
brandlist:WritableSignal<Ibrand1[] |null>=signal(null);
getallbrandssub!: Subscription;


ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
let para:string =p.get('id')!;
this.getallbrandssub=this._ProductsService.getalltype('brand',para).subscribe({
  next:(res)=>{
this.brandlist.set(res.data);
console.log(this.brandlist);

  }
})
      }
    })
}
addcart(id:string):void {
  this._CartService.addproductTocart(id).subscribe({
    next:(res)=>{
console.log(res);
this._ToastrService.success(res.message , 'FreshCart')
this._CartService.countnum.set(res.numOfCartItems);
}
})
}
truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
ngOnDestroy(): void {
this.getallbrandssub.unsubscribe();
  
}
}
