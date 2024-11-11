import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive ,RouterLink , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
 readonly _AuthService = inject(AuthService);
 private readonly _MytranslateService = inject(MytranslateService);
  readonly _TranslateService = inject(TranslateService);
  readonly _CartService = inject(CartService);
cartcount:Signal<number> =computed(()=>this._CartService.countnum());
 changeLang(lang:string):void {
this._MytranslateService.changeLang(lang);
 }
ngOnInit(): void {
this._CartService.getproductscart().subscribe({
  next:(res)=>{
console.log(res);
this._CartService.countnum.set(res.numOfCartItems);
  }
})


}
}
