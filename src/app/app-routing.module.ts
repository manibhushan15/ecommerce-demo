import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BillingPage } from './pages/billing/billing.pages';
import { CheckoutPage } from './pages/checkout/checkout.pages';
import { ProductsPage } from './pages/products/products.pages';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path : 'products' , component : ProductsPage },
  { path : 'billing' , component : BillingPage, canActivate: [AuthGuard] },
  { path : 'checkout' , component : CheckoutPage },
  { path : 'payment' , component : PaymentComponent },
  {
    path : '',
    redirectTo : '/products',
    pathMatch : 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: false
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
