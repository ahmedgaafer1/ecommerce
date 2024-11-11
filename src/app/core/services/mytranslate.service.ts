import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  private _TranslateService= inject(TranslateService);
  private _PLATFORM_ID= inject(PLATFORM_ID);
  private _renderer2= inject(RendererFactory2).createRenderer(null,null);
  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID)) {
          this._TranslateService.setDefaultLang('en');  
          this.setLang()
    }
   }

setLang():void {
  let savedLang= localStorage.getItem('savedLang');
  if(savedLang !== null) {
    this._TranslateService.use(savedLang !);
  }
if (savedLang === 'en') {
  // document.documentElement.dir='ltr';
  this._renderer2.setAttribute(document.documentElement,'dir','ltr');
  this._renderer2.setAttribute(document.documentElement,'lang','en');
}
else if (savedLang === 'ar') {
// document.documentElement.dir='rtl';
this._renderer2.setAttribute(document.documentElement,'dir','rtl');
this._renderer2.setAttribute(document.documentElement,'lang','ar');
}
}
// setLang(): void {
//   if (isPlatformBrowser(this._PLATFORM_ID)) {
//     let savedLang = localStorage.getItem('savedLang');
//     if (savedLang != null) {
//       this._TranslateService.use(savedLang);
//     }
//     if (savedLang === 'en') {
//       this._renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
//     } else if (savedLang === 'ar') {
//       this._renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
//     }
//   }
// }
changeLang(lang:string):void {
  if(isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('savedLang',lang );
     this.setLang();
  }
}
}
