import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class ParametersService {

  private static parametersApi = 'http://{server}/ltsapi/api/parametros/{popid}?station={station}&position={position}';

  constructor(private _http: Http) { }

  getParameters(popid, station, position) {
    let url = ParametersService.parametersApi
      .replace('{popid}', popid)
      .replace('{station}', station)
      .replace('{position}', position);

    this._http.get(url).map( res => res.json()).catch(this.errorHandler);
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
