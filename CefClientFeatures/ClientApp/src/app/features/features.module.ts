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

import { FeaturesService } from '../services/features.service';
import { AppCanActivate } from '../app.can-activate';
import { FeaturesResolver } from '../resolvers/features.resolver';
import { FeatureResolver } from '../resolvers/feature.resolver';

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
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Details/:id',
        component: DetailsComponent,
        resolve: { feature: FeatureResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Create',
        component: CreateComponent,
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Edit/:id',
        component: EditComponent,
        resolve: { feature: FeatureResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Delete/:id',
        component: DeleteComponent,
        resolve: { feature: FeatureResolver },
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
    FeaturesService,
    AppCanActivate,
    FeaturesResolver,
    FeatureResolver
  ]
})
export class FeaturesModule {
}
