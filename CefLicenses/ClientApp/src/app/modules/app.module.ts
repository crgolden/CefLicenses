import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AccountModule } from './account.module';
import { ClientsModule } from './clients.module';
import { FeaturesModule } from './features.module';
import { ClientFeaturesModule } from './client-features.module';
import { AppComponent } from '../components/app/app.component';
import { NavMenuComponent } from '../components/nav-menu/nav-menu.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: '**', redirectTo: 'Home' }
    ]),
    AccountModule,
    ClientsModule,
    FeaturesModule,
    ClientFeaturesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
