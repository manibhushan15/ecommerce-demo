import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingFormModel } from './model/billingformfields.model';
import { CompanyDetailsModel } from './model/companydetails.model';
import { ProductsModel } from './model/products.model';
import { PaymentComponent } from './payment/payment.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { CartService } from './services/cart.service';
import { StorageService } from './services/storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuDir } from './directives/menu.dir';
import { AddToCartDir } from './directives/addtocart.dir';
import { BillingDir } from './directives/billing.dir';
import { BillingCartDir } from './directives/billingcart.dir';
import { CheckOutDir } from './directives/checkout.dir';
import { ProductsListDir } from './directives/productslist.dir';
import { ProductsPage } from './pages/products/products.pages';
import { BillingPage } from './pages/billing/billing.pages';
import { CheckoutPage } from './pages/checkout/checkout.pages';
import { RouterConfig, RouterDeclarations } from './router.config';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ModalModule } from "ngx-bootstrap/modal";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ 
    AppComponent, 
    MenuDir,ProductsListDir,AddToCartDir,BillingDir,BillingCartDir,CheckOutDir, 
    FilterPipe,
    SortPipe, 
    PaymentComponent,
    ProductsPage,
    BillingPage,
    CheckoutPage,
    RouterDeclarations,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterConfig,
    ModalModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuDir,ProductsListDir,AddToCartDir,BillingDir,BillingCartDir,CheckOutDir, ProductsPage,
    BillingPage,
    CheckoutPage,
    PaymentComponent
  ],
  providers : [ProductsModel,BillingFormModel,CompanyDetailsModel, StorageService,CartService,AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
