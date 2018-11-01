import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IndexComponent } from '../components/features/index/index.component';
import { DetailsComponent } from '../components/features/details/details.component';
import { CreateComponent } from '../components/features/create/create.component';
import { EditComponent } from '../components/features/edit/edit.component';
import { DeleteComponent } from '../components/features/delete/delete.component';
import { FeaturesService } from '../services/features.service';
import { AppCanActivate } from '../guards/app.can-activate';
import { FeaturesResolver } from '../resolvers/features.resolver';
import { FeatureResolver } from '../resolvers/feature.resolver';
import { ClientsResolver } from '../resolvers/clients.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'Features',
        component: IndexComponent,
        resolve: { features: FeaturesResolver },
        // canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Details/:id',
        component: DetailsComponent,
        resolve: { feature: FeatureResolver },
        // canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Create',
        component: CreateComponent,
        resolve: { clients: ClientsResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Edit/:id',
        component: EditComponent,
        resolve: { feature: FeatureResolver, clients: ClientsResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Delete/:id',
        component: DeleteComponent,
        resolve: { feature: FeatureResolver },
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
    FeaturesService,
    AppCanActivate,
    FeaturesResolver,
    FeatureResolver,
    ClientsResolver
  ]
})
export class FeaturesModule {
}
