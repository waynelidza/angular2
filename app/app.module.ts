import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';

import { AdminComponent } from './components/admin/admin.component';
import { StdProvisioningComponent } from './components/stdprovisioning/stdprovisioning.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent }  from './app.component';
import { FeedbackComponent } from'./components/feedback/feedback.component';
import { StreamingListComponent } from './components/streaming-list/streaming-list.component';

import { AppRoutingModule }     from './app.routes';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, AppRoutingModule],
  declarations: [ AppComponent, AdminComponent, StdProvisioningComponent, HomeComponent, FeedbackComponent, StreamingListComponent],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
