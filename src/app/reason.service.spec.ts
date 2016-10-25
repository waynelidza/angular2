/* tslint:disable:no-unused-variable */
import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing'
import {Observable} from 'rxjs/Rx';

import { ReasonService } from './reason.service';

// describe('smoke', () => {
//   it ('should fail', () =>{
//     expect(true).toBeFalsy();
//   })
// })


describe('Reason Service', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ReasonService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));
  
  it('Get the status', (done) => {
    let reasonService: ReasonService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          if (connection.request.url.endsWith('assets/Configs/Configs.json')){
            console.log('Mocking config');
            connection.mockRespond(new Response(
              new ResponseOptions({
                    body: [{
                      wsUrl : "http://svc",
                      GetStatustPollMilliSeconds : 1000,
                      GetLogPollMilliSeconds : 1000,
                      HomeURL : "http://home"
                    }]
                  })));
          } else {
            console.log('mocking status')
            connection.mockRespond(new Response(
              new ResponseOptions({
                    body: {status: "submitted"}
                  })));
          }
        });

        reasonService = getTestBed().get(ReasonService);
        expect(reasonService).toBeDefined();

        reasonService.getStatus('aa','bb').subscribe( (data:any) => {
              expect(data).toBeDefined();
              expect(data.status).toBe("submitted");
              done();
        });
      });
  });
});

