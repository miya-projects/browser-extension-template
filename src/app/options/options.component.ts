import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormTooltipIcon
} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from "@angular/forms";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    FormsModule,
    NzInputDirective,
    ReactiveFormsModule,
    NzRowDirective,
    NzInputGroupComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzCheckboxComponent
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent implements OnInit{

  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      chrome.storage.local.set({ config: this.validateForm.value }).then(() => {
        this.messageService.success("保存成功!")
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: NonNullableFormBuilder, private messageService: NzMessageService) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    chrome.storage.local.get("config").then((result) => {
      this.validateForm.patchValue(result['config'])
    });
  }
}
