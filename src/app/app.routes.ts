import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminComponent} from'../admin/admin.component';
import {HomeComponent} from'../home/home.component';
import {FeedbackComponent} from'../feedback/feedback.component';
import {StdProvFormInputComponent} from'../std-prov-form-input/std-prov-form-input.component';
import { StdProvisioningComponent } from '../stdprovisioning/stdprovisioning.component';

// Route Configuration
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'reasonux/', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin', component: AdminComponent },
    { path: 'home', component: HomeComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'std', component: StdProvisioningComponent },
    { path: 'StdProvFormInput', component: StdProvFormInputComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
  
}