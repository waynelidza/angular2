import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DemoService {

constructor(private http:Http) {
    }


 getPost(productName, jsonTemplate)  {

       //return this.http.get('/app/shared/post.json').map((res:Response) => res.json());
   return this.http.post('http://localhost:3000/products/'+ productName +'/deployments',jsonTemplate).map(res=>res.json());

}


    getStatus(uuid, name) {
        return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/status').map((res:Response) => res.json());
    }




    getLogandOutput(uuid) {
        return Observable.forkJoin(
        this.http.get('http://localhost:3000/products/test/deployments/'+ uuid +'/status').map((res:Response) => res.json()),
        this.http.get('/app/shared/log.json').map((res:Response) => res.json())
        );
    }


}
