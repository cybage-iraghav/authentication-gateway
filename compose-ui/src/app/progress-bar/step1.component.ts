import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MuiProgressStepComponent } from '@mapp-ui/unify';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step1Component implements OnInit, OnDestroy {

  form: UntypedFormGroup;

  private destroyed$ = new Subject<void>();

  constructor(
      private fb: UntypedFormBuilder,
      private cd: ChangeDetectorRef,
      private step: MuiProgressStepComponent) {
  }

  ngOnInit(): void {
    // we want to monitor changes from outside this component, especially form state changes like 'touched',
    // which might be triggered by the progress-stepper. This is a workaround as there are currently no observables
    // in Angular forms for changes of touched or dirty. (See https://github.com/angular/angular/issues/10887)
    this.step.changes
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.cd.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  createFormGroup() {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });

    return this.form;
  }

}
