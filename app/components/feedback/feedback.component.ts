import { Component, NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { ReasonService } from '../../services/reason.service';


@Component({
  moduleId: module.id,
  selector: 'feedback-component',
  templateUrl: 'feedback.component.html',
  styleUrls: [ 'feedback.component.css' ], 
  providers: [ReasonService]
})
export class FeedbackComponent {

    private responseMessage:string = "";
    private class:string = "";
    private display:string = "";

    constructor(private _reasonService: ReasonService){

    }


//FeedbackRequest button click--------------------------------------------------------------------------------------
  sendFeedbackRequest(formValue:any){

    var jsonData = JSON.stringify(formValue);
    
          this._reasonService.doFeedbackPost(jsonData).subscribe(
          );

          this.setFeedbackMessage('Thanks for the feedback, we will get back to you shortly :)','s');

  }

//setFeedbackMessage------------------------------------------------------------------------------------------------
  setFeedbackMessage(TheMessage:string, MessageType:string ){

    if(MessageType == "s")
    {
          this.responseMessage = TheMessage
          this.class = 'alert alert-success';
          this.display = 'visible';
    }
    else if(MessageType == "e")
    {
          this.responseMessage = TheMessage
          this.class = 'alert alert-danger';
          this.display = 'visible';
    }  
    else if(MessageType == "i")
    {
      //TODO:.............
    }
    else
    {
      //TODO:.............
    }

  }

}