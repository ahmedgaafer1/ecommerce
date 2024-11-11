import { NgFor } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iproducts } from '../../core/interfaces/iproducts';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TrimtextPipe } from '../../core/pipes/trimtext.pipe';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselModule , RouterLink , TrimtextPipe , SearchPipe , TranslateModule ,FormsModule , NgFor  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService) ;
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productlist:WritableSignal<Iproducts[]>=signal([]);
  getallproductssub!: Subscription;
text : string="";
currentPage:WritableSignal<number> = signal(1);
itemsPerPage: WritableSignal<number> = signal(18);
totalPages:  WritableSignal<number> =signal(0);
startIndex:number=0;
endIndex!:number;




paginatedProducts: WritableSignal<Iproducts[]> = signal([]);

ngOnInit(): void {
  this._NgxSpinnerService.show();
  this.getallproductssub = this._ProductsService.getallproducts().subscribe({
    next: (res) => {
      console.log(res);
      this.productlist.set(res.data);
      this.totalPages.set(Math.ceil(res.data.length / this.itemsPerPage()));
    
      this.changePage(1);
      this._NgxSpinnerService.hide();
    }
  });
}

changePage(pageNumber: number): void {
  this.currentPage.set(pageNumber);
  this.startIndex = (pageNumber - 1) * this.itemsPerPage();
  this.endIndex = this.startIndex + this.itemsPerPage();
  // this.paginatedProducts.set(this.productlist().slice(startIndex, endIndex));
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