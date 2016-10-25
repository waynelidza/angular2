/* tslint:disable:no-unused-variable */
import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockBackend } from '@angular/http/testing'
import { Observable } from 'rxjs/Rx';

import { ReasonService } from './reason.service';
import { HttpMockResponse } from '../testing/http-responses';

describe('Reason Service', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule(HttpMockResponse.testModuleMetaDataWith({
      providers: [ReasonService]
    }));

    mockBackend = getTestBed().get(MockBackend);
  }));
  
  it('Get the status', (done) => {
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
              done();
        });
      });
  });
});

