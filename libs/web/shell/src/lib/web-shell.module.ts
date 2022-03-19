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
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadChildren: () =>
              import('@nrwl-evan/web/feature-ticket-list').then(
                (m) => m.WebFeatureTicketListModule
              ),
          },
          {
            path: ':id',
            loadChildren: () =>
              import('@nrwl-evan/web/feature-ticket-detail').then(
                (m) => m.WebFeatureTicketDetailModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WebShellModule {}
