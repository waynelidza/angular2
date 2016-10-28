/* tslint:disable:no-unused-variable */
import { getTestBed, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MockBackend } from '@angular/http/testing';

import { StdProvisioningComponent } from './stdprovisioning.component';
import { StdProvForm } from '../std-prov-form-input/std-prov-form-input.interface';
import { ReasonService } from '../app/reason.service';

import { HttpMockResponse } from '../testing/mock-http-response';

@Component({
    selector: 'streaming-list-component',
    template: '' 
})
class MockStreamingList
{
  @Input() items:any;
  @Input() title:string;
  @Input() status:string;
  @Input('icon-type') iconType:string;
  @Input('is-visible') isVisible:boolean;       
}

@Component({
  selector: 'std-prov-form-input',
  template: ''
})
class MockStdProvFormInputComponent  {
  @Output() submittedEvent: EventEmitter<StdProvForm> = new EventEmitter<StdProvForm>();
}

@Component({
  selector: 'feedback-component',
  template: ''
})
class MockFeedbackComponent {
    @Input() featureName:string;
}



describe('StdprovisioningComponent', () => {
  let component: StdProvisioningComponent;
  let fixture: ComponentFixture<StdProvisioningComponent>;
  let spy:jasmine.Spy;
  let reasonService:ReasonService;
  let mockBackend:MockBackend;


  beforeEach(async(() => {
    TestBed.configureTestingModule(HttpMockResponse.testModuleMetaDataWith({
      declarations: [ StdProvisioningComponent, MockStreamingList, MockStdProvFormInputComponent, MockFeedbackComponent ],
      providers: [ ReasonService ]
    }))
    .compileComponents();

    fixture = TestBed.createComponent(StdProvisioningComponent);
    mockBackend = TestBed.get(MockBackend);
    HttpMockResponse.mockHttpCalls(mockBackend, [ HttpMockResponse.config() ]);

    component    = fixture.componentInstance;

    // TwainService actually injected into the component
    reasonService = fixture.debugElement.injector.get(ReasonService);
    
    // Setup spy on the `getQuote` method
    spy = spyOn(reasonService, 'getProvisioningOptions')
      .and.returnValue(Observable.create(observer => {
        observer.onNext({});
        observer.onComplete();
        //return () => console.log('disposed') // would be cleanup
      }));

    


          

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
