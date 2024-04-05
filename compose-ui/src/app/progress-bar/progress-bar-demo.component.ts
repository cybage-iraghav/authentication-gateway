import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Step1Component } from './step1.component';
import { Step2Component } from './step2.component';

@Component({
  templateUrl: './progress-bar-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarDemoComponent implements OnInit {

  form: UntypedFormGroup;

  @ViewChild(Step1Component, { static: true }) step1Component: Step1Component;
  @ViewChild(Step2Component, { static: true }) step2Component: Step2Component;

  constructor(private fb: UntypedFormBuilder) {}

  get step1Form() {
    return this.form.get('step1') as UntypedFormGroup;
  }

  get step2Form() {
    return this.form.get('step2') as UntypedFormGroup;
  }

  ngOnInit() {
    this.form = this.fb.group({
      step1: this.step1Component.createFormGroup(),
      step2: this.step2Component.createFormGroup()
    });

  }

}
