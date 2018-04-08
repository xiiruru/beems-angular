import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
 


import { AppComponent } from './app.component';
import { AssetComponent } from './asset/asset.component';
import { HomeComponent } from './home/home.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'asset', component: AssetDetailComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AssetComponent,
    HomeComponent,
    AssetDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
