import { inject, Injectable, Injector, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  NgModel
} from "@angular/forms";

@Injectable()
export abstract class BaseControlValueAccessorComponent<T> implements ControlValueAccessor, OnInit {

  injector = inject(Injector);
  value: T;
  control: FormControl;

  onChange = (value: T) => {
  }
  onTouch = () => {
  }

  ngOnInit() {
    this.control = this.getControl();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: T): void {
    this.value = value;
  }

  private getControl(): FormControl {
    const injectedControl = this.injector.get(NgControl);
    switch (injectedControl.constructor) {
      case NgModel:
        return (injectedControl as NgModel).control;
      case FormControlName:
        return this.injector.get(FormGroupDirective).getControl(injectedControl as FormControlName);
      default:
        return (injectedControl as FormControlDirective).form as FormControl;
    }
  }
}
