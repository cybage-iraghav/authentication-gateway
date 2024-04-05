import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MuiProgressStepComponent } from '@mapp-ui/unify';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step2Component implements OnInit, OnDestroy {

  form: UntypedFormGroup;

  private destroyed$ = new Subject<void>();

  constructor(
      private fb: UntypedFormBuilder,
      private cd: ChangeDetectorRef,
      private step: MuiProgressStepComponent) {
  }

  ngOnInit(): void {
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
      address: [null, Validators.required],
      address_opt: null,
      city: [null, Validators.required]
    })

    return this.form;
  }

}
