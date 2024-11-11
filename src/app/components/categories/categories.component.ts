import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TrimtextPipe } from '../../core/pipes/trimtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CategoriesService } from '../../core/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Icategories } from '../../core/interfaces/icategories';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule , RouterLink , TrimtextPipe , SearchPipe , TranslateModule ,FormsModule , NgFor ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _ToastrService = inject(ToastrService);
  currentPage:WritableSignal<number> = signal(1);
  itemsPerPage: WritableSignal<number> = signal(18);
  totalPages:  WritableSignal<number> =signal(0);
  startIndex:number=0;
  endIndex!:number;
  categorylist:WritableSignal<Icategories[]>=signal([]);
getallcatsub!: Subscription;
text : string="";


  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this.getallcatsub = this._CategoriesService.getallcategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categorylist.set(res.data);
        this._NgxSpinnerService.hide();
      }
    });
  }
  ngOnDestroy(): void {
    this.getallcatsub.unsubscribe();
  }
  

}
