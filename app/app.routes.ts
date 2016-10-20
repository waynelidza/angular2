import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminComponent} from'./components/admin/admin.component';
import {StdProvisioningComponent} from'./components/stdprovisioning/stdprovisioning.component';
import {HomeComponent} from'./components/home/home.component';
import {FeedbackComponent} from'./components/feedback/feedback.component';

// Route Configuration
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin', component: AdminComponent },
    { path: 'std', component: StdProvisioningComponent },
    { path: 'home', component: HomeComponent },
    { path: 'feedback', component: FeedbackComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
  
}