import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent, LayoutComponentModule } from './layout.component';
import { WebDataAccessTicketsModule } from '@nrwl-evan/web/data-access-tickets';

@NgModule({
  imports: [
    CommonModule,
    LayoutComponentModule,
    WebDataAccessTicketsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@nrwl-evan/web/feature-ticket-list').then(
                (m) => m.WebFeatureTicketListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WebShellModule {}
