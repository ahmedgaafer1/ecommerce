import { TrimtextPipe } from './../../core/pipes/trimtext.pipe';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icategoriestype } from '../../core/interfaces/icategoriestype';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-catallspec',
  standalone: true,
  imports: [RouterLink ,TrimtextPipe, TranslateModule],
  templateUrl: './catallspec.component.html',
  styleUrl: './catallspec.component.scss'
})
export class CatallspecComponent implements OnInit  {
  private readonly _ProductsService= inject(ProductsService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService);
  private readonly _ActivatedRoute= inject(ActivatedRoute);
categorylist:WritableSignal<Icategoriestype[] | null>  = signal(null);
getallproductssub!: Subscription;
cat:string="";
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
this.cat=p.get('catid')!;
 this.getallproductssub=this._ProductsService.getalltype('category',this.cat).subscribe({
next:(res)=>{
  this.categorylist.set(res.data);
  console.log("new data",this.categorylist);
  

}
})
      }
    })
}
ngOnDestroy(): void {
this.getallproductssub.unsubscribe();
  
}
truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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

}
