import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ActivatedRoute= inject(ActivatedRoute);
  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _OrdersService= inject(OrdersService);
  cartid :string | null = '';
  Orders:FormGroup = this._FormBuilder.group({
details:[null],
phone:[null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
city:[null]
  })
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          console.log(params);
          this.cartid =params.get('id');
        },
        error:(err)=>{
          console.log(err)

        }
      })
  }
  ordersubmit():void {
    console.log(this.Orders.value);
    this._OrdersService.checkOut(this.cartid , this.Orders.value).subscribe({
      next:(res)=>{
console.log(res);
if(res.status =='success') {
window.open(res.session.url , '_self');
}
      },
      error:(err)=>{
console.log(err);
      }
    })
  }
}
