import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { IndexComponent } from '../components/client-features/index/index.component';
import { DetailsComponent } from '../components/client-features/details/details.component';
import { CreateComponent } from '../components/client-features/create/create.component';
import { EditComponent } from '../components/client-features/edit/edit.component';
import { DeleteComponent } from '../components/client-features/delete/delete.component';
import { ClientFeaturesService } from '../services/client-features.service';
import { AppCanActivate } from '../guards/app.can-activate';
import { ClientFeatureResolver } from '../resolvers/client-feature.resolver';
import { ClientFeaturesResolver } from '../resolvers/client-features.resolver';
import { ClientResolver } from '../resolvers/client.resolver';
import { ClientsResolver } from '../resolvers/clients.resolver';
import { FeatureResolver } from '../resolvers/feature.resolver';
import { FeaturesResolver } from '../resolvers/features.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'ClientFeatures',
        component: IndexComponent,
        resolve: { clientFeatures: ClientFeaturesResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'ClientFeatures/Details/:id1/:id2',
        component: DetailsComponent,
        resolve: { clientFeature: ClientFeatureResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'ClientFeatures/Create',
        component: CreateComponent,
        resolve: { clients: ClientsResolver, features: FeaturesResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'ClientFeatures/Edit/:id1/:id2',
        component: EditComponent,
        resolve: { clientFeature: ClientFeatureResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'ClientFeatures/Delete/:id1/:id2',
        component: DeleteComponent,
        resolve: { clientFeature: ClientFeatureResolver },
        canActivate: [AppCanActivate]
      }
    ]),
    GridModule,
    DropDownsModule,
    DatePickerModule,
    BrowserAnimationsModule
  ],
  declarations: [
    IndexComponent,
    DetailsComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  providers: [
    ClientFeaturesService,
    AppCanActivate,
    ClientResolver,
    ClientsResolver,
    ClientFeatureResolver,
    ClientFeaturesResolver,
    FeatureResolver,
    FeaturesResolver
  ]
})
export class ClientFeaturesModule {
}
