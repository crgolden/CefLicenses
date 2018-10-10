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

import { ClientsService } from '../services/clients.service';
import { AppCanActivate } from '../app.can-activate';
import { ClientsResolver } from '../resolvers/clients.resolver';
import { ClientResolver } from '../resolvers/client.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'Clients',
        component: IndexComponent,
        resolve: { clients: ClientsResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Details/:id',
        component: DetailsComponent,
        resolve: { client: ClientResolver },
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
        resolve: { client: ClientResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Delete/:id',
        component: DeleteComponent,
        resolve: { client: ClientResolver },
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
    ClientsResolver,
    ClientResolver
  ]
})
export class ClientsModule {
}
