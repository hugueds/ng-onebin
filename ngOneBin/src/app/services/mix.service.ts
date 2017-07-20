import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppConfig } from 'app/app.config';


@Injectable()
export class MixService {

  private static mixApi = 'http://{server}:{port}/api/mix';
  private mix: any;
  private subject = new Subject<any>();

  constructor(private _http: Http) { }

  getMix(date?: string, complete?: boolean) {
    let url = this._getServerApi();

    if (date) {
      url += `?date=${date}`;
    }

    return this._http.get(url)
      .map(res => {
        this.mix = res.json();
        return this.mix;
      })
      .catch(this.errorHandler);
  }

  getEntrance() {
    let url = this._getServerApi() + '/entrance';
    return this._http.get(url)
    .map( res => res.json()).catch(this.errorHandler);    
  }


  private _getServerApi() {
    return MixService.mixApi
      .replace('{server}', AppConfig.server.address)
      .replace('{port}', AppConfig.server.port);
  }

  errorHandler(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
