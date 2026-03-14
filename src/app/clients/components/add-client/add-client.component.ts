
import { MatDialogRef, MatDialogActions, MatDialogContent } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ClientConstants } from '../../constants/client-constants';
import { AddClientForm } from '../../interfaces/client-interfaces';
@Component({
  selector: 'app-add-client',
  imports: [MatDialogActions, MatDialogContent, ReactiveFormsModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {
  formGroup = new FormGroup<AddClientForm>({
  name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(ClientConstants.clientNameMinLength)] }),
  email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  phone: new FormControl<string | null>(null),
});
   readonly dialogRef = inject(MatDialogRef<AddClientComponent>);

   onNoClick(): void {
    this.dialogRef.close();
  }
  saveClient(){
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
    if(this.formGroup.invalid) return;
    this.dialogRef.close(this.formGroup.value);
  }

}
