import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { Sample } from './components/sample.component';
import { AdminComponent } from './components/admin.component';
import { StdProvisioningComponent } from './components/stdprovisioning.component';
import { HomeComponent } from './components/home.component';
import { AppComponent }  from './app.component';
import { AppRoutingModule }     from './app.routes';



@NgModule({
  imports: [ BrowserModule,FormsModule,HttpModule,AppRoutingModule],
  declarations: [ AppComponent,Sample,AdminComponent,StdProvisioningComponent,HomeComponent],
  bootstrap: [ AppComponent ]
})

export class AppModule {

 }
