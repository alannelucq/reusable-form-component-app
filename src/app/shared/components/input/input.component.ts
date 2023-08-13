import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { BaseControlValueAccessorComponent } from "../base-control-value-accessor.component";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <label
        [for]="id"
        [ngClass]="{ required: required || control.hasValidator(Validators.required) }">
        {{ label }}
      </label>
      <input
        #input [id]="id"
        [placeholder]="placeholder" [value]="value"
        (focusout)="onTouch()"
        (input)="onChange(input.value)"
      />
    </div>

    <div class="error-container">
      <ng-container *ngIf="control.touched">
        <ng-content select="app-error"></ng-content>
      </ng-container>
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
export class InputComponent extends BaseControlValueAccessorComponent<string> {

  protected readonly Validators = Validators;
  @Input({required: true}) id: string;
  @Input({required: true}) label: string;
  @Input({transform: booleanAttribute}) required = false;
  @Input() placeholder = '';
}
