import{Component, NgModule}from '@angular/core';
import {Http, HTTP_PROVIDERS}from "@angular/http";
'@angular/http'; import 'rxjs/add/operator/map';
import {bootstrap}from "@angular/platform-browser-dynamic";

import {DemoService}from './shared/demo.service';
import {Observable}from 'rxjs/Rx';

import {FormsModule, provideForms, disableDeprecatedForms}from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DemoService],
})

export class AppComponent {
  title = 'Reason UX';
  public outputJSONs;
  public logJSONs;
  public posts;
  public displayOutputDiv = false;
  public displayLogDiv = false;
  public displayRequestDiv = false;
  public uuid = '';
  public status;
  public templateName;
  public templatejson;
  public message = '';
  public hasError = false;
  public messageStatus = '';
  public finalMessage = '';
  public display = 'none';
  public messageDiv = '<div class="alert alert-[MessageStatus]"><strong>[MessageStatus]]!</strong> [ErrorMEssage]</div>';
  public class = '';
  public year = new Date().getFullYear();
  public requestSubmitted=false;

  constructor(private _demoService: DemoService) {}

  sendRequest(formValue){

    var v= false;
      if(formValue.templateName.length > 0)
      {
            v = true;
      }
      else
      {
        this.hasError = true;
        this.messageStatus = 'danger';
        this.message = 'Template name must be entered!!';
      }

    if(this.IsJsonString(formValue.templatejson) && v == true )
    {
          this.templateName = formValue.templateName;
          this.templatejson = formValue.templatejson;

                  var sleep = function (time) {

            return new Promise((resolve) => setTimeout(resolve, time));
          }

        this.getPost();

        sleep(1000).then(() => {

                  if (this.status === "submitted")
                  {
                    //this.displayOutputDiv = true;
                    //this.displayLogDiv = true;
                   // this.displayRequestDiv = true;

                   // this.getLogandOutput();

                    this.hasError = false;
                    this.messageStatus = 'success';
                    this.message = '';
                    this.class = 'alert alert-success';
                    this.message = 'uuid: ' + this.uuid;
                    this.display = 'visible';

                    this.requestSubmitted = true;



                  }
                else
                {

                  //alert ("We couldn't get a response from the server");
                  this.hasError = true;
                  this.messageStatus = 'danger';
                  this.message = 'Error: No response from server';
                  this.class = 'alert alert-danger';
                }

              });


    }
    else{

        this.hasError = true;
        this.messageStatus = 'danger';
        this.class = 'alert alert-danger';

      if(v == true )
      {
        if(formValue.templatejson.length > 0)
        {
          this.message = 'Error: JSON Template is required';
        }
        else
        {
            this.message = 'Error: Json is invalid';
        }

      }
      else
      {

        this.message = 'Error: Provisioning Name is a required field';
      }

    }


    this.messageDiv = this.messageDiv.replace('[MessageStatus]',this.messageStatus);
    this.messageDiv = this.messageDiv.replace('[ErrorMEssage]',this.message);

    this.finalMessage = this.messageDiv;
    this.display = 'visible';


            if(this.requestSubmitted==true){

            this.getStatus();
            }

            else{

            console.log('is false');

            }


}


 getPost() {

   if(this.IsJsonString(this.templatejson)){

     // alert('json is valid');
    this._demoService.getPost(this.templateName,this.templatejson ).subscribe(

      data => { this.posts = 'created',this.uuid = data.uuid, this.status=data.status},
      err => console.error(err),
     // () => console.log('done loading posts')
      () => console.log('done loading posts')
    );
   }
else{

  alert('not valid JSON');
}

  }

 IsJsonString(str) {

    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


  getLogandOutput() {

    this._demoService.getLogandOutput(this.uuid).subscribe(
      data => {
        this.outputJSONs = data[0],
        this.logJSONs = data[1]
      }

    );
  }

  getStatus() {
console.log('get status');


                          //this.displayOutputDiv = true;
                    //this.displayLogDiv = true;
                   // this.displayRequestDiv = true;

                   // this.getLogandOutput();


  }


}
bootstrap(AppComponent, [HTTP_PROVIDERS,]);
bootstrap(AppComponent, [
disableDeprecatedForms(), provideForms()
]);
