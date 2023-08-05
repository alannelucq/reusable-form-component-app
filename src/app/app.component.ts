import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { InputComponent } from "./shared/components/input/input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSnackBarModule, InputComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = inject(FormBuilder).group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    company: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: ['',],
    job: ['', [Validators.required]],
  });

  register() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    console.log(`Inscription réussie ! 🎉`)
  }
}
