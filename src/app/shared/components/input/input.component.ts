import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <label [for]="id"> {{ label }}</label>
      <input [id]="id" [placeholder]="placeholder" [ngModel]="value" (ngModelChange)="writeValue($event)"/>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input({required: true}) id: string;
  @Input({required: true}) label: string;
  @Input() placeholder = '';

  value = '';

  onChange = (value: string) => {
  }
  onTouch = (value: string) => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouch(value);
  }
}
