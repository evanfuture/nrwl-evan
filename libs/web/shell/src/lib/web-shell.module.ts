import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebDataAccessTicketsModule } from '@nrwl-evan/web/data-access-tickets';
import { LayoutComponent, LayoutComponentModule } from './layout.component';

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
            loadChildren: () => import('@nrwl-evan/web/feature-ticket-list').then((m) => m.WebFeatureTicketListModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WebShellModule {}
