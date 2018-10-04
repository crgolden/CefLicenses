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

import { FeaturesService } from './features.service';
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
        path: 'Features',
        component: IndexComponent,
        resolve: { features: IndexResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Details/:id',
        component: DetailsComponent,
        resolve: { feature: DetailsResolver },
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
        resolve: { feature: DetailsResolver },
        canActivate: [AppCanActivate]
      },
      {
        path: 'Features/Delete/:id',
        component: DeleteComponent,
        resolve: { feature: DetailsResolver },
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
    IndexResolver,
    DetailsResolver
  ]
})
export class FeaturesModule {
}
