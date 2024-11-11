import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-catdetails',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './catdetails.component.html',
  styleUrl: './catdetails.component.scss'
})
export class CatdetailsComponent implements OnInit {
  private readonly _CategoriesService= inject(CategoriesService);
private readonly _ActivatedRoute= inject(ActivatedRoute);
speccategory:Icategories | null=null;
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
let catid=p.get('catid');
 this._CategoriesService.getspeccategory(catid).subscribe({
next:(res)=>{
  console.log(res);
  this.speccategory=res.data;
}
})
      }
    })
}
}
