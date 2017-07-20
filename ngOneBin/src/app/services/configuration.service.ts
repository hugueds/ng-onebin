import { Injectable } from '@angular/core';

@Injectable()

export class ConfigurationService {

  constructor() { }

  get() {
    return
  }

  save(config) {
    for (let  c in config){      
        if (config.hasOwnProperty(c)) {
           this._lsSet(c, config[c]);
        }
    }      
  }

  private _lsGet(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  private _lsSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
