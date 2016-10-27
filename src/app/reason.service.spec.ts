/* tslint:disable:no-unused-variable */
import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RequestMethod, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ReasonService } from './reason.service';
import { HttpMockResponse } from '../testing/mock-http-response';

describe('Reason Service', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule(HttpMockResponse.testModuleMetaDataWith({
      providers: [ReasonService]
    }));

    mockBackend = getTestBed().get(MockBackend);
  }));
  
  it('Get the status', endAsync => {
    let reasonService: ReasonService;

    getTestBed().compileComponents().then(() => {
          HttpMockResponse.mockHttpCalls(mockBackend, [
          HttpMockResponse.config(),
          HttpMockResponse.withBody({status:"submitted"})
        ]);

        reasonService = getTestBed().get(ReasonService);
        expect(reasonService).toBeDefined();

        reasonService.getStatus('aa','bb').subscribe( (data:any) => {
              expect(data).toBeDefined();
              expect(data.status).toBe("submitted");
              endAsync();
        });
      });
  });

  it('Gets configs and sets them', endAsync => {
    let reasonService: ReasonService;

    getTestBed().compileComponents().then(()=>{
      HttpMockResponse.mockHttpCalls(mockBackend, [
        HttpMockResponse.config()
      ])

      reasonService = getTestBed().get(ReasonService);
      expect(reasonService).toBeDefined();

      reasonService.getConfigs().subscribe(() =>{
        expect(reasonService.wsURL).toBe(HttpMockResponse.reasonConfig.wsUrl);
        expect(reasonService.GetLogPollMilliSeconds).toBe(HttpMockResponse.reasonConfig.GetLogPollMilliSeconds);
        expect(reasonService.GetStatustPollMilliSeconds).toBe(HttpMockResponse.reasonConfig.GetStatustPollMilliSeconds);
        expect(reasonService.HomeURL).toBe(HttpMockResponse.reasonConfig.HomeURL);

        endAsync();
      })
    })
  })

  it('Posts feed back', endAsync => {
    let reasonService: ReasonService;
    let postBody: any;
    let postUrl: string;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe( (connection:MockConnection) => {
        if (connection.request.method == RequestMethod.Get)
        {          
          connection.mockRespond(HttpMockResponse.config().response)
        }
        else if (connection.request.method == RequestMethod.Post)
        {
          postBody = JSON.parse(connection.request.getBody());
          postUrl = connection.request.url;
          connection.mockRespond(new Response( new ResponseOptions({
            status:200
          })));          
        }
      });

      reasonService = getTestBed().get(ReasonService);
      expect(reasonService).toBeDefined();

      reasonService
        .doFeedbackPost({email:'bob@bob.com', comment:'the grass is greener'})
        .subscribe(() => {
          expect(postBody.email).toBe('bob@bob.com');
          expect(postBody.comment).toBe('the grass is greener');
          expect(postUrl).toBe('http://svc/api/feedback');

          endAsync();
        })
    })
  })

  it('Posts std provisioning requests', endAsync => {
    let reasonService: ReasonService;
    let postBody: any;
    let postUrl: string;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe( (connection:MockConnection) => {
        if (connection.request.method == RequestMethod.Get)
        {          
          connection.mockRespond(HttpMockResponse.config().response)
        }
        else if (connection.request.method == RequestMethod.Post)
        {
          postBody = connection.request.getBody();
          postUrl = connection.request.url;
          connection.mockRespond(new Response( new ResponseOptions({
            status:200
          })));          
        }
      });

      reasonService = getTestBed().get(ReasonService);
      expect(reasonService).toBeDefined();

      reasonService
        .doStdProvisioningPost('testproduct', 'templatebody')
        .subscribe(data => {
          expect(postBody).toBe('templatebody');
          expect(postUrl).toBe('http://svc/api/products/testproduct/deployments');

          endAsync();
        })
    })
  })

  
});

