import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketListComponent, TicketListComponentModule } from './ticket-list.component';

@NgModule({
  imports: [
    CommonModule,
    TicketListComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: TicketListComponent,
        children: [
          {
            path: ':id',
            loadChildren: () =>
              import('@nrwl-evan/web/feature-ticket-detail').then((m) => m.WebFeatureTicketDetailModule),
          },
        ],
      },
    ]),
  ],
})
export class WebFeatureTicketListModule {}
