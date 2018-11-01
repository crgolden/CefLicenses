import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IndexComponent } from '../components/clients/index/index.component';
import { DetailsComponent } from '../components/clients/details/details.component';
import { CreateComponent } from '../components/clients/create/create.component';
import { EditComponent } from '../components/clients/edit/edit.component';
import { DeleteComponent } from '../components/clients/delete/delete.component';
import { ClientsService } from '../services/clients.service';
import { AppCanActivate } from '../guards/app.can-activate';
import { ClientsResolver } from '../resolvers/clients.resolver';
import { ClientResolver } from '../resolvers/client.resolver';
import { FeaturesResolver } from '../resolvers/features.resolver';

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
        // canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Details/:id',
        component: DetailsComponent,
        resolve: { client: ClientResolver },
        // canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Create',
        component: CreateComponent,
        resolve: { features: FeaturesResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Edit/:id',
        component: EditComponent,
        resolve: { client: ClientResolver, features: FeaturesResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Clients/Delete/:id',
        component: DeleteComponent,
        resolve: { client: ClientResolver },
        canActivate: [AppCanActivate]
      }
    ]),
    GridModule,
    BrowserAnimationsModule,
    FontAwesomeModule
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
    ClientResolver,
    FeaturesResolver
  ]
})
export class ClientsModule {
}
