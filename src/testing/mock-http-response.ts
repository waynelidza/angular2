import { Response, ResponseOptions, BaseRequestOptions, Http, XHRBackend, HttpModule } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'
import { TestModuleMetadata } from '@angular/core/testing'

export class ResponseContainer
{
    public constructor(private _response:Response, private _predicate:(connection:MockConnection)=>boolean){
    }

    public get response():Response{
        return this._response;
    }

    public isMatch(connection:MockConnection):boolean{
        return this._predicate(connection);
    }
}  

export class HttpMockResponse
{
    public static reasonConfig = {
                    wsUrl : "http://svc",
                    GetStatustPollMilliSeconds : 1000,
                    GetLogPollMilliSeconds : 1000,
                    HomeURL : "http://home"
                };

    public static testModuleMetaDataWith(metaData:TestModuleMetadata):TestModuleMetadata{
        if (!metaData.providers){
            metaData.declarations = new Array<any>();
        }
        if (!metaData.imports){
            metaData.imports = new Array<any>();
        }
        
        metaData.providers.push(MockBackend);
        metaData.providers.push(BaseRequestOptions);
        metaData.providers.push({
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        });

        metaData.imports.push(HttpModule);
        
        return metaData;
    }

    public static mockHttpCalls(mockBackend:MockBackend, responses:Array<ResponseContainer>){
        mockBackend
            .connections
            .subscribe((connection: MockConnection) => {
                let isMatch = responses.find(container => container.isMatch(connection));
                if (isMatch)
                {
                    connection.mockRespond(isMatch.response);
                }
            });
    }

    public static withBody(body:any):ResponseContainer{
        return new ResponseContainer(new Response(
            new ResponseOptions({
                body: body
                })), (connection:MockConnection) => {
                    return true;
            })
    }

    public static config():ResponseContainer{
        return new ResponseContainer(new Response(
            new ResponseOptions({
                body: [ this.reasonConfig ]
                })), (connection:MockConnection) => {
                    return connection.request.url.endsWith('assets/Configs/Configs.json');
            })
    }
}