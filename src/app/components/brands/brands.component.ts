import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
private readonly _BrandsService=inject(BrandsService);
brandList:WritableSignal<Ibrand[]>=signal([]);
getallbrandssub!: Subscription;

ngOnInit(): void {
    this.getallbrandssub=this._BrandsService.getallbrands().subscribe({
      next:(res)=>{
console.log(res);
this.brandList.set(res.data);
      }
    })
}
ngOnDestroy(): void {
  this.getallbrandssub.unsubscribe();
  
}
}
