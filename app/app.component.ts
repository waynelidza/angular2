import { Component, NgModule } from '@angular/core';
import { Http } from "@angular/http";
'@angular/http'; import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from "@angular/forms";
//import { Sample } from './components/sample.component';

@Component({
  selector: 'app-component',
templateUrl: 'app/app.component.html',
   styleUrls: ['app/app.component.css'], 
  //providers: [ReasonService]
  
})

export class AppComponent {

      constructor() {


      }

}

