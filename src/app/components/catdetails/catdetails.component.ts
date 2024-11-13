import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catdetails',
  standalone: true,
  imports: [CarouselModule , TranslateModule],
  templateUrl: './catdetails.component.html',
  styleUrl: './catdetails.component.scss'
})
export class CatdetailsComponent implements OnInit {
  private readonly _CategoriesService= inject(CategoriesService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService);
private readonly _ActivatedRoute= inject(ActivatedRoute);
speccategory:Icategories | null=null;
catid:WritableSignal<string>=signal('');
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
      next:(p)=>{
this.catid.set(p.get('catid')!);
 this._CategoriesService.getspeccategory(this.catid()).subscribe({
next:(res)=>{
  console.log(res);
  this.speccategory=res.data;
}
})
      }
    })
}

// addcart():void {
//   this._CartService.addproductTocart(this.catid()).subscribe({
//     next:(res)=>{
// console.log(res);
// this._ToastrService.success(res.message , 'FreshCart')
// this._CartService.countnum.set(res.numOfCartItems);
// }
// })
// }
}
