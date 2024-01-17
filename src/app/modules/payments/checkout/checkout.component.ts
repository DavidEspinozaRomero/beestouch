import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    // FormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  fb = inject(FormBuilder);

  billingForm = this.fb.group({
    client: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    ruc: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  shipingAddressForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    comment: ['', Validators.required],
  });

  sendForm = this.fb.nonNullable.group({
    type: ['', Validators.required],
    comemnt: ['', Validators.required],
  });

  paymentForm = this.fb.nonNullable.group({
    type: ['', Validators.required],
  });

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  isValidControl(formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName);
    return control?.errors && control?.touched;
  }
}
