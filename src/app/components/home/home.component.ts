import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Icategories } from '../../core/interfaces/icategories';
import { Iproducts } from '../../core/interfaces/iproducts';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TrimtextPipe } from '../../core/pipes/trimtext.pipe';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink , TrimtextPipe , SearchPipe , FormsModule , TranslateModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
private readonly _ProductsService = inject(ProductsService)
private readonly _CategoriesService = inject(CategoriesService)
private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)
private readonly _NgxSpinnerService = inject(NgxSpinnerService)
productlist:WritableSignal<Iproducts[]>=signal([]);
categorylist:WritableSignal<Icategories[]>=signal([]);
getallproductssub!: Subscription;
text : string="";
currentPage:WritableSignal<number> = signal(1);
itemsPerPage: WritableSignal<number> = signal(18);
totalPages:  WritableSignal<number> =signal(0);
startIndex:number=0;
endIndex!:number;
customOptionsmain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayHoverPause:true,
  autoplayTimeout:2500,
  navSpeed: 700,
  rtl:true,
  navText: ['', ''],
 items:1,
  nav: true
};
// customOptionscat: OwlOptions = {
//   loop: true,
//   mouseDrag: true,
//   touchDrag: true,
//   pullDrag: false,
//   dots: false,
//   autoplay:true,
//   autoplayHoverPause:true,
//   rtl:true,
//   autoplayTimeout:2500,
//   navSpeed: 700,
//   navText: ['<i class="fa-solid fa-forward"></i>', '<i class="fa-solid fa-backward"></i>'],
//   responsive: {
//     0: {
//       items: 1
//     },
//     400: {
//       items: 2
//     },
//     740: {
//       items: 3
//     },
//     940: {
//       items: 6
//     }
//   },
//   nav: true
// };
customOptionscat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay: true,
  autoplayHoverPause: true,
  rtl: true,
  autoplayTimeout: 2500,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-forward"></i>', '<i class="fa-solid fa-backward"></i>'],
  responsive: {
    0: { items: 1 },
    400: { items: 1 },
    740: { items: 2 },
    940: { items: 3 },
    1240: { items: 4 }
  },
  nav: true
};
ngOnInit(): void {
  this._NgxSpinnerService.show();
   this.getallproductssub = this._ProductsService.getallproducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productlist.set(res.data);
        this.totalPages.set(Math.ceil(res.data.length / this.itemsPerPage()));
        this.changePage(1);
        this._NgxSpinnerService.hide();
      }
    });

    this._CategoriesService.getallcategories().subscribe({
      next:(res)=>{
this.categorylist.set( res.data );
      }
    })
}
changePage(pageNumber: number): void {
  this.currentPage.set(pageNumber);
  this.startIndex = (pageNumber - 1) * this.itemsPerPage();
  this.endIndex = this.startIndex + this.itemsPerPage();
 
  this.productlist().slice(this.startIndex, this.endIndex);
}
ngOnDestroy(): void {
  this.getallproductssub.unsubscribe();
}

addcart(id : string):void {
  this._CartService.addproductTocart(id).subscribe({
    next:(res)=>{
console.log(res);
this._ToastrService.success(res.message , 'FreshCart')
this._CartService.countnum.set(res.numOfCartItems);
    } ,
    error:(err)=>{
console.log(err);
    }
  })
}
}
