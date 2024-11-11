// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { NotfoundComponent } from './components/notfound/notfound.component';
// import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
// import { HomeComponent } from './components/home/home.component';
// import { ProductComponent } from './components/product/product.component';
// import { CartComponent } from './components/cart/cart.component';
// import { BrandsComponent } from './components/brands/brands.component';
// import { CategoriesComponent } from './components/categories/categories.component';
// import { authgGuard } from './core/guards/auth.guard';
// import { logedGuard } from './core/guards/loged.guard';
// import { DetailsComponent } from './components/details/details.component';
// import { CatdetailsComponent } from './components/catdetails/catdetails.component';
// import { ForgotComponent } from './components/forgot/forgot.component';
// import { AllordersComponent } from './components/allorders/allorders.component';
// import { OrdersComponent } from './components/orders/orders.component';



// export const routes: Routes = [{path:'',component:AuthLayoutComponent, canActivate:[logedGuard] ,
//     children:[
//         {path:'' ,redirectTo:'login',pathMatch:"full"},
//         {path:'login' ,component:LoginComponent},
//     {path:'register' , component:RegisterComponent},
//     {path:'forgot' , component:ForgotComponent},
   
// ]},
//     {path:'', component:BlankLayoutComponent, canActivate:[authgGuard] , children:[
//         {path:'',redirectTo:'home', pathMatch:'full'},
//         {path:'home',component:HomeComponent},
//         {path:'products' ,component:ProductComponent},
//         {path:'cart' , component:CartComponent},
//         {path:'brands' , component:BrandsComponent},
//         {path:'categories', component:CategoriesComponent},
//         {path:'details/:id', component:DetailsComponent},
//         {path:'catdetails/:catid', component:CatdetailsComponent},
//         {path:'allorders', component:AllordersComponent},
//         {path:'orders/:id', component:OrdersComponent},
     
//     ]},
//     {path:'**' , component:NotfoundComponent}];
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
      // { path: 'orders', loadComponent: () => import('./components/orders/orders.component').then(c => c.OrdersComponent) },
      { path: 'branddetails/:id', loadComponent: () => import('./components/branddetails/branddetails.component').then(c => c.BranddetailsComponent) },
    ]
  },
  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) }
];
