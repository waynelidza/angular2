import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { Sample } from './components/sample.component';
import { AdminComponent } from './components/admin.component';
import { StdProvisioningComponent } from './components/stdprovisioning.component';
import { HomeComponent } from './components/home.component';
import { AppComponent }  from './app.component';


@NgModule({
  imports: [ BrowserModule,FormsModule,HttpModule],
  declarations: [ AppComponent,Sample,AdminComponent,StdProvisioningComponent,HomeComponent],
  bootstrap: [ AppComponent ]
})

export class AppModule {

 }
