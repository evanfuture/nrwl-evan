import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { getAllTicketsExpanded, getTicketsLoading, init } from '@nrwl-evan/web/data-access-tickets';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'nrwl-evan-ticket-list',
  template: `
    <div class="grid grid-cols-2 gap-5 py-4">
      <div
        class="bg-slate-800 rounded-xl shadow-xl ring-1 ring-slate-900/5 divide-y  my-auto xl:mt-18  divide-slate-200/5 highlight-white/10"
      >
        <h2 class="py-6 px-4 text-lg font-title">All Tickets</h2>

        <ul class="divide-y divide-slate-200/5">
          <li *ngIf="loading$ | async" class="animate-pulse">
            <div class="flex items-start space-x-6 p-6">
              <div class="min-w-0 relative flex-auto">
                <div class="bg-slate-400 h-3 w-3/4 rounded"></div>
                <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                  <div class="absolute top-0 right-0 flex items-center space-x-1">
                    <dt class="text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </dt>
                  </div>

                  <div class="flex-none w-full mt-2 font-normal">
                    <dd class="h-2 bg-slate-400 w-1/4 rounded"></dd>
                  </div>
                </dl>
              </div>
            </div>
          </li>
          <li *ngFor="let ticket of tickets$ | async">
            <a
              [routerLink]="[ticket.id]"
              class="flex items-start space-x-6 p-6 hover:bg-white/20"
              [ngClass]="{ 'bg-white/10': ticket.isActive }"
            >
              <div class="min-w-0 relative flex-auto">
                <h2 class="font-semibold text-white truncate pr-20">{{ ticket.description }}</h2>
                <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                  <div class="absolute top-0 right-0 flex items-center space-x-1">
                    <dt [ngClass]="ticket.completed ? 'text-sky-500' : 'text-gray-400'">
                      <span class="sr-only">Status</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          *ngIf="ticket.completed; else notCompleted"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        <ng-template #notCompleted>
                          <circle cx="12" cy="12" r="10" />
                        </ng-template>
                      </svg>
                    </dt>
                  </div>

                  <div class="flex-none w-full mt-2 font-normal">
                    <dt class="sr-only">Assignee</dt>
                    <dd class="text-slate-400">{{ ticket.assignee?.name }}</dd>
                  </div>
                </dl>
              </div>
            </a>
          </li>
        </ul>
        <a [routerLink]="['new']" class="block text-center py-6 px-4 w-full rounded-b-xl hover:bg-blue-700"
          >Create Ticket</a
        >
      </div>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent implements OnInit {
  tickets$ = this.store.select(getAllTicketsExpanded);
  loading$ = this.store.select(getTicketsLoading);

  // TODO: Filter tickets
  // TODO: Complete tickets

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(init());
  }
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TicketListComponent],
  exports: [TicketListComponent],
})
export class TicketListComponentModule {}
