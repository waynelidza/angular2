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

  constructor(private _demoService: DemoService) {

  }

//Submit button click---------------------------------------------------------------------------------------------------------
  sendRequest(formValue){

    var v = false;
    this.uuid = '';
    //validation #1
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

    //validation #2
    if(this.IsJsonString(formValue.templatejson) && v == true )
    {
          this.templateName = formValue.templateName;
          this.templatejson = formValue.templatejson;

          //TOO: IS THIS STILL NEEDED???
            var sleep = function (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
          }

        //DO INITIAL POST
        this.doPost();

        sleep(1000).then(() => {

                if (this.status === "submitted"){
                this.hasError = false;
                this.messageStatus = 'success';
                this.message = '';
                this.class = 'alert alert-success';
                this.message = 'uuid: ' + this.uuid;
                this.display = 'visible';

                this.requestSubmitted = true; // :) WE HAVE THE UUID :)

                //CHECK THE STATUS AND THEN POLL...
                this.getStatustPoll();

                }
                else{
                this.hasError = true;
                this.messageStatus = 'danger';
                this.message = 'Error: No response from server';
                this.class = 'alert alert-danger';
                }
        });
    }
    else{

      //DO ERROR FORMATTING ETC...
        this.hasError = true;
        this.messageStatus = 'danger';
        this.class = 'alert alert-danger';

        if(v == true ){
          if(formValue.templatejson.length > 0){
            this.message = 'Error: JSON Template is required';
          }
          else{
              this.message = 'Error: Json is invalid';
          }
        }
        else{
          this.message = 'Error: Provisioning Name is a required field';
        }

    }

    //SHOW MESSAGE DIV LASTLY
    this.messageDiv = this.messageDiv.replace('[MessageStatus]',this.messageStatus);
    this.messageDiv = this.messageDiv.replace('[ErrorMEssage]',this.message);

    this.finalMessage = this.messageDiv;
    this.display = 'visible';

}

//----------------------------------------------------------------------------------------------------------------------------
 doPost() {

   if(this.IsJsonString(this.templatejson)){
        this._demoService.doPost(this.templateName,this.templatejson ).subscribe(
          data => { this.posts = 'created',this.uuid = data.uuid, this.status=data.status},
          err => console.error(err), //TODO: OUTPUT ERRORS/MESSAGES TO UX
          () => console.log('done loading posts') //TODO: OUTPUT ERRORS/MESSAGES TO UX
        );
      }
      else{
        alert('not valid JSON'); //TODO: OUTPUT ERRORS/MESSAGES TO UX
    }

  }

//SIMPLE IS VALID JASON CHECK----------------------------------------------------------------------------------------------------------------------------
 IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//----------------------------------------------------------------------------------------------------------------------------
  getLogandOutput() {

    this._demoService.getLogandOutput(this.uuid).subscribe(

      data => {
        this.outputJSONs = data[0],
        this.logJSONs = data[1]
      }
    );
  }
  
//STATUS POLL----------------------------------------------------------------------------------------------------------------------------
getStatustPoll() {

      //WAIT FOR THE UUID TO BE SET ...USUALLY A FEW SECONDS
      while(this.uuid == '')
      {
        console.log('waiting for uui...')
      }

      //CALL POLLABLE SERVICE
      this._demoService.getStatustPoll(this.uuid, this.templateName).subscribe(
        data => {
        this.status = data.status,this.displayRequestDiv = true
        }

    );
  }
//----------------------------------------------------------------------------------------------------------------------------


}
bootstrap(AppComponent, [HTTP_PROVIDERS,]);
bootstrap(AppComponent, [
disableDeprecatedForms(), provideForms()
]);
