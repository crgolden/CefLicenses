import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

import { ClientsService } from './clients.service';
import { AppCanActivate } from '../app.can-activate';
import { IndexResolver } from './index/index.resolver';
import { DetailsResolver } from './details/details.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'Clients',
        component: IndexComponent,
        resolve: { clients: IndexResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Details/:id',
        component: DetailsComponent,
        resolve: { client: DetailsResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Create',
        component: CreateComponent,
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Edit/:id',
        component: EditComponent,
        resolve: { client: DetailsResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Delete/:id',
        component: DeleteComponent,
        resolve: { client: DetailsResolver },
        canActivate: [AppCanActivate]
      }
    ])
  ],
  declarations: [
    IndexComponent,
    DetailsComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  providers: [
    ClientsService,
    AppCanActivate,
    IndexResolver,
    DetailsResolver
  ]
})
export class ClientsModule {
}
