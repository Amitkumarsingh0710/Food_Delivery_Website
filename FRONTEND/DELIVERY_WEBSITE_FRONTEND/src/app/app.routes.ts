import { HomePage } from './home-page/home-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomePage },                   
  { path: 'login',loadComponent: () => import('./login-page/login-page').then(m => m.LoginPage) },            
  { path: 'signup', loadComponent: () => import('./signup-page/signup-page').then(m => m.SignupPage) },        
  { path: 'edit', loadComponent:()=>import('./edit-profile/edit-profile').then(m=>m.EditProfile)},          
  { path: 'editMenu/:id', loadComponent:()=>import('./edit-menu/edit-menu').then(m=>m.EditMenu) },
  { path: 'create-menu', loadComponent:()=>import('./create-menu/create-menu').then(m=>m.CreateMenu)},    
  { path: 'section-items/:sectionName', loadComponent:()=>import('./section-items/section-items').then(m => m.SectionItems)},   
  { path: 'view-cart', loadComponent:()=> import('./view-cart/view-cart').then(m => m.ViewCart) },       
  { path: 'order-page', loadComponent:()=> import('./order-page/order-page').then(m => m.OrderPage) },   
  { path: 'hotel-manager-order-page',loadComponent:()=>import('./hotel-manager-order-page/hotel-manager-order-page').then(m => m .HotelManagerOrderPage) },   
  { path: 'admin-page', loadComponent:()=>import('./admin-page/admin-page').then(m => m.AdminPage) },   
  { path: 'admin-add-agent', loadComponent:()=>import('./admin-add-agent/admin-add-agent').then(m => m.AdminAddAgent) },
  { path: 'admin-create-restaurant', loadComponent:()=>import('./add-restaurant/add-restaurant').then(m => m.AddRestaurant) },
  {path:'payment-page/:totalPrice',loadComponent : ()=>import('./payment-page/payment-page').then(m => m.PaymentPage)}    
]; 
