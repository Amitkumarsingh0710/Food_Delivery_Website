import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { HeaderComponent } from './header-component/header-component';
import {authguardGuard} from './authguard-guard'

export const routes: Routes = [
  
  { path: 'login', loadComponent: () => import('./login-page/login-page').then(m => m.LoginPage) },
  { path: 'signup', loadComponent: () => import('./signup-page/signup-page').then(m => m.SignupPage) },
  {
    path: '',
    component:HeaderComponent,
    children: [
      { path: '', component: HomePage },
      { path: 'edit', loadComponent: () => import('./edit-profile/edit-profile').then(m => m.EditProfile) ,canActivate: [authguardGuard]},
      { path: 'editMenu/:id', loadComponent: () => import('./edit-menu/edit-menu').then(m => m.EditMenu),canActivate: [authguardGuard] },
      { path: 'create-menu', loadComponent: () => import('./create-menu/create-menu').then(m => m.CreateMenu), canActivate: [authguardGuard] },
      { path: 'section-items/:resId/:sectionName', loadComponent: () => import('./section-items/section-items').then(m => m.SectionItems) },
      { path: 'view-cart', loadComponent: () => import('./view-cart/view-cart').then(m => m.ViewCart), canActivate: [authguardGuard] },
      { path: 'order-page', loadComponent: () => import('./order-page/order-page').then(m => m.OrderPage), canActivate: [authguardGuard] },
      { path: 'hotel-manager-order-page', loadComponent: () => import('./hotel-manager-order-page/hotel-manager-order-page').then(m => m.HotelManagerOrderPage), canActivate: [authguardGuard] },
      { path: 'admin-page', loadComponent: () => import('./admin-page/admin-page').then(m => m.AdminPage) , canActivate: [authguardGuard]},
      { path: 'add-restaurant', loadComponent: () => import('./add-restaurant/add-restaurant').then(m => m.AddRestaurant),canActivate: [authguardGuard] },
      { path: 'restaurant-section/:resId/:name', loadComponent: () => import('./restaurant-section/restaurant-section').then(m => m.RestaurantSection), canActivate: [authguardGuard] },
      { path: 'add-agent', loadComponent: () => import('./admin-add-agent/admin-add-agent').then(m => m.AdminAddAgent),canActivate: [authguardGuard] },
      { path: 'payment-page/:totalPrice', loadComponent: () => import('./payment-page/payment-page').then(m => m.PaymentPage) ,canActivate: [authguardGuard]}
    ]
  },

  { path: '**', redirectTo: '' }
];


      
