import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  createTicket,
  getAllUsers,
  getIsNew,
  getSelected,
  getTicketUpdating,
  Ticket,
  updateTicket,
} from '@nrwl-evan/web/data-access-tickets';
import { Subscription } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'nrwl-evan-ticket-detail',
  template: ` <ng-container
    *ngIf="{
      isNew: isNew$ | async,
      updating: updating$ | async
    } as data"
  >
    <div
      class="relative bg-slate-800 rounded-xl shadow-xl ring-1 ring-slate-900/5 divide-y  my-auto  divide-slate-200/5 highlight-white/10"
    >
      <button (click)="onClose()" class="absolute top-0 right-0 p-3">
        <svg class="h-4 w-4">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
      <div class="py-6 px-4">
        <form [formGroup]="form">
          <label class="mb-10 block">
            <span class="mb-2 block text-slate-400">Description</span>
            <input
              class="text-slate-600 appearance-none rounded border py-2 px-3 leading-tight shadow  block w-3/4"
              type="text"
              placeholder="..."
              aria-label="Description"
              formControlName="description"
            />
          </label>

          <label class="mb-4 block">
            <span class="mb-2 block text-slate-400">Completed</span>
            <div class="relative block">
              <input type="checkbox" formControlName="completed" />
            </div>
          </label>

          <label class="mb-10 block">
            <span class="mb-2 block text-slate-400">Assignee</span>
            <div class="relative block">
              <select
                formControlName="assigneeId"
                class="text-slate-600  rounded border py-2 px-3 leading-tight shadow"
              >
                <option [ngValue]="null">Unassigned</option>
                <option *ngFor="let user of users$ | async" [ngValue]="user.id">{{ user.name }}</option>
              </select>
            </div>
          </label>

          <button
            type="button"
            class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
            (click)="onSave(data.isNew, data.updating)"
          >
            <svg
              *ngIf="data.updating"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ data.updating ? 'Processing...' : data.isNew ? 'Create' : 'Save' }}
          </button>
        </form>
      </div>
    </div>
  </ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent {
  ticket$ = this.store.select(getSelected);
  users$ = this.store.select(getAllUsers);
  updating$ = this.store.select(getTicketUpdating);
  isNew$ = this.store.select(getIsNew);

  detailsSub: Subscription;

  form: FormGroup = this.fb.group({
    description: ['', [Validators.required]],
    assigneeId: [null],
    completed: [false],
  });

  constructor(private store: Store, private router: Router, private fb: FormBuilder) {
    // sub is destroyed when the component is destroyed `@UntilDestroy({ checkProperties: true })`
    this.detailsSub = this.ticket$.subscribe((ticket) => {
      this.form.controls['description'].setValue(ticket?.description, { emitEvent: false });
      this.form.controls['assigneeId'].setValue(ticket?.assigneeId || null, { emitEvent: false });
      this.form.controls['completed'].setValue(ticket?.completed, { emitEvent: false });
    });
  }

  onSave(isNew: boolean, isUpdating: boolean): void {
    const { description, assigneeId, completed } = this.form.controls;
    const isValid: boolean = description.valid;
    if (isValid && !isUpdating) {
      const updates: Partial<Omit<Ticket, 'id'>> = {
        description: description.value,
        assigneeId: assigneeId.value,
        completed: completed.value,
      };

      const action = isNew
        ? createTicket({ description: description.value, assigneeId: assigneeId.value })
        : updateTicket({ updates });
      this.store.dispatch(action);
    }
  }

  onClose() {
    this.router.navigate(['..']);
  }
}

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [TicketDetailComponent],
  exports: [TicketDetailComponent],
})
export class TicketDetailComponentModule {}
