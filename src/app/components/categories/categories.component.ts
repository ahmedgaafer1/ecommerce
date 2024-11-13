import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Icategories } from '../../core/interfaces/icategories';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [  RouterLink  ,TranslateModule ,FormsModule],
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
