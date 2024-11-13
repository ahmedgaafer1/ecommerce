
import { Routes } from '@angular/router';
import { authgGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent) },
      { path: 'forgot', loadComponent: () => import('./components/forgot/forgot.component').then(c => c.ForgotComponent) },
    ]
  },
  {
    path: '', loadComponent: () => import('./layouts/blank-layout/blank-layout.component').then(c => c.BlankLayoutComponent),
    canActivate: [authgGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
      { path: 'products', loadComponent: () => import('./components/product/product.component').then(c => c.ProductComponent) },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then(c => c.BrandsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent) },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then(c => c.DetailsComponent) },
      { path: 'catdetails/:catid', loadComponent: () => import('./components/catdetails/catdetails.component').then(c => c.CatdetailsComponent) },
      { path: 'catallspec/:catid', loadComponent: () => import('./components/catallspec/catallspec.component').then(c => c.CatallspecComponent) },
      { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then(c => c.AllordersComponent) },
      { path: 'orders/:id', loadComponent: () => import('./components/orders/orders.component').then(c => c.OrdersComponent) },
      { path: 'branddetails/:id', loadComponent: () => import('./components/branddetails/branddetails.component').then(c => c.BranddetailsComponent) },
    ]
  },
  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) }
];
