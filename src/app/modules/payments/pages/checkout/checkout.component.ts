import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  NgxPayPalModule,
} from 'ngx-paypal';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    NgxPayPalModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  fb = inject(FormBuilder);
  cartService = inject(CartService);
  router = inject(Router);
  isScriptLoaded = false;
  public payPalConfig?: IPayPalConfig;
  randomId = Math.random().toString(36).slice(-8);

  billingForm = this.fb.nonNullable.group({
    client: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(16)]],
    address: ['', [Validators.required]],
    ruc: ['', [Validators.required, Validators.maxLength(16)]],
    date: [new Date(), [Validators.required]],
  });

  shipingAddressForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    comment: ['', Validators.required],
  });

  sendForm = this.fb.nonNullable.group({
    type: ['', Validators.required],
    comment: ['', Validators.required],
  });

  paymentForm = this.fb.nonNullable.group({
    type: ['', Validators.required],
  });

  ngOnInit(): void {
    this.initConfig();
  }
  isValidControl(formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName);
    return control?.errors && control?.touched;
  }

  onSubmit() {
    this.billingForm.markAllAsTouched();
    this.paymentForm.markAllAsTouched();
    this.shipingAddressForm.markAllAsTouched();

    if (
      !this.billingForm.valid ||
      !this.paymentForm.valid ||
      !this.shipingAddressForm.valid
    ) {
      console.log('Form is not valid');
      return;
    }

    // this.router.navigate(['/success']);
  }

  onScriptLoad(event: any) {
    this.isScriptLoaded = true;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AYzz7cn2aB-2aa34M3zyK8XVMgyfGMxwv_5qULXxABGOeRLM-0t1psS1KKboWE_6IgI51iQkUR7kfQ0D',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${this.cartService.amountOrder}`,
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.cartService.openSnackBar('Gracias por su compra', 'OK');
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;
        this.cartService.openSnackBar('Cancelado', 'OK');
      },
      onError: (err) => {
        console.log('OnError', err);
        // this.showError = true;
        this.cartService.openSnackBar('Error', 'OK');
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }
}
