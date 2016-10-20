import { Component, NgModule } from '@angular/core';
import { Http } from "@angular/http";
'@angular/http'; import 'rxjs/add/operator/map';
import { ReasonService } from '../../services/reason.service';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from "@angular/forms";


@Component({
  moduleId: module.id,
  selector: 'home-component',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ], 
  providers: [ReasonService]
  
})

export class HomeComponent {
    
    constructor(){
        console.log('export class HomeComponent ');
    }
}