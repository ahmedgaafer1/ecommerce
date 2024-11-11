import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { MytranslateService } from './core/services/mytranslate.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , FooterComponent , NgxSpinnerComponent , TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
 
 
}
