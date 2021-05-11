import { RouterModule, Routes } from '@angular/router';

import { ProductsPage } from './pages/products/products.pages'; 
import { CheckoutPage } from './pages/checkout/checkout.pages'; 
import { BillingPage } from './pages/billing/billing.pages'; 
import { PaymentComponent } from './payment/payment.component';
const appRoutes: Routes = [
  { path : 'products' , component : ProductsPage },
  { path : 'billing' , component : BillingPage },
  { path : 'checkout' , component : CheckoutPage },
  { path : 'payment' , component : PaymentComponent },
  {
    path : '',
    redirectTo : '/products',
    pathMatch : 'full'
  }
]

export const RouterConfig = [
  RouterModule.forRoot(
    appRoutes,{
      enableTracing : false,
      useHash : false
  })

];

export const RouterDeclarations = [ ProductsPage , BillingPage , CheckoutPage ];


