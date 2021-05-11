import { ChangeDetectorRef, Component,Input,NgZone,Output } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CartService } from '../services/cart.service';
import { FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { ExternalLibraryService } from '../utils';
import { HttpErrorResponse } from '@angular/common/http';
//import { emailValidation } from '../validations/custom.validate';
declare var Razorpay: any;

@Component({
  selector : 'billing-dir',
  template : `
      <form [formGroup]="billingForm" (ngSubmit) = "send()">
      
      <div class="form-row">

          <div class="form-group col-md-6" *ngFor="let formFields of __billing">
             
            <label for="inputEmail4">{{formFields.label}}</label>
            <div *ngIf="formFields.type=='text'">
            <input 
            type="text" 
            class="form-control" 
            formControlName="{{formFields.uid}}"
            placeholder="{{formFields.placeholder}}" />

            <small 
            class="form-text text-danger" 
            *ngIf="billingForm.controls[formFields.uid].status=='INVALID' && billingForm.controls[formFields.uid].touched"
            >{{formFields.errorMsg}}</small></div>

            <div *ngIf="formFields.type=='select'">
              <select id="inputState" class="form-control" formControlName = "{{formFields.uid}}">
                <option>Select</option>
                <option *ngFor="let optionName of formFields.options" value="{{optionName}}">{{optionName}}</option>
              </select>
              <small class="form-text text-danger" 
            *ngIf="billingForm.controls[formFields.uid].status=='INVALID' && billingForm.controls[formFields.uid].touched"
            >{{formFields.errorMsg}}</small>
            </div>
          </div>
                 
      </div>
    <button type="submit" class="btn btn-sm btn-primary" [disabled]="billingForm.invalid" *ngIf="cart.cartItemsList && cart.cartTotal">Confirm and Place Order</button>
    <a routerLink="/products" class="btn btn-sm btn-info float-right">Continue Shopping</a>
  
</form>
  `,
  styles: [`
  form .ng-invalid.ng-touched{
    border-color: #dc3545;
  }
  `]
})

export class BillingDir{
  public billingForm: any = {};
  public errorsInfo: any = {};
  @Input('billingFields') __billing: any = {};
  data: any;
  constructor(
    public fb:FormBuilder,
    public storage:StorageService,
    public cart:CartService,
    public router:Router,
    public paymentService: PaymentService,
    private readonly _razorpayService: ExternalLibraryService,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
  ){
    this._razorpayService
    .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
    .subscribe();
  }

  razorPayData: any;
  razorPayOptions = {
    "key":'',
    "amount": '',
    "currency": 'INR',
    "name":'',
    "description": "Skartz Payment Example",
    "order_id": '',
    "handler": (res: any) =>{
    }
  };
  submitted: boolean = false;
  loading: boolean = false;
  razorpayResponse: any;
  showModal = false;
  ngOnInit(){ 
  this.loadForm();
}

loadForm(){
   let temp: any = {};
   let billingInfo=this.cart.loadCheckoutInfo('customerInfo');
   if(billingInfo === undefined || billingInfo ==='' || billingInfo === null){
      billingInfo = {}; 
    }
   (this.__billing).forEach( (item: any) => {
     
     temp[ item.uid ] = [ billingInfo[item.uid] , item.validation ];
     
   } );

  this.billingForm = this.fb.group(temp);

}


send(){  
  if(this.billingForm.valid){
    
    this.storage.set({
      customerInfo:this.billingForm.value
    })
    //document.location.href="/checkout";


    //  this.router.navigate(['/payment']);

    if(this.billingForm.value.paymentmode == 'Online') {
      // this.buyRazorPay();
      this.proceed();
    } else {
     this.router.navigate(['/checkout']);
    }
  }
}

// buyRazorPay(){
//   this.submitted = true;
//   this.loading = true;
//   this.razorPayData = {
//     "name" : "demo",
//     "amount": 1,
//     "email": "demo@gmail.com"
//   };
//   this.data = this.paymentService.razorPayOrder(this.razorPayData).subscribe(response => {
//     this.setRazorAndOpen(response);
//   });
// }

// setRazorAndOpen(data: any) {
//     this.razorPayOptions.key = data['key'];
//     this.razorPayOptions.amount = data['value']['amount'];
//     this.razorPayOptions.name = this.razorPayData['name'];
//     this.razorPayOptions.order_id = data['value']['id'];
//     this.razorPayOptions.handler = this.razorPayResponseHandler;
//     var rzpl = new Razorpay(this.razorPayOptions);
//     rzpl.open();
// }
// razorPayResponseHandler(response: any){
//   console.log(response);
// }
  // ************* first Method End**********

  RAZORPAY_OPTIONS = {
    "key":'',
    "amount": 0,
    "name": "Mani Bhushan",
    "order_id": "",
    "description": "Load Wallet",
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "handler": {},
    "prefill": {
      "name": "Mani Bhushan",
      "email": "test@test.com",
      "contact": "9067787678",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };

  public proceed() {
    this.RAZORPAY_OPTIONS['key'] = "rzp_test_iPdRYz4iGbwviB";
    this.RAZORPAY_OPTIONS['amount'] = (this.cart.cartTotal * 100);
    this.RAZORPAY_OPTIONS['name'] = this.RAZORPAY_OPTIONS['prefill']['name'];;
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);
    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
    }

  public razorPaySuccessHandler(response: any) {
    console.log(response);
    this.zone.run(() => {
      this.router.navigate(['/checkout']);
    });

  }


}