import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "app/services/configuration.service";
import { Router } from "@angular/router";

@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [ConfigurationService]
})
export class ConfigurationComponent implements OnInit {

  //Buscar de uma base de dados
  avaliableInstances: any = [
    { id: 0, name: 'Bogie', stationSequence: 0 },
    { id: 1, name: 'Mola dianteira',  stationSequence: 4 },
    { id: 2, name: 'Mola traseira',  stationSequence: 4 },
    { id: 3, name: 'Pneus',  stationSequence: 29 }
  ]

  selectedInstances: any[] = [];

  config: any = {};

  constructor(private _configService: ConfigurationService,
  private _router: Router) { }

  ngOnInit() {
  }

  addInstance(instance) {
    this._updateInstance('add', instance);
    this.config.instances = this.selectedInstances;
  }

  removeInstance(instance) {
    this._updateInstance('remove', instance);
  }

  save() {    
    this._configService.save(this.config);
    this._router.navigate(['']);
  }


  private _updateInstance(operation, instance) {
    let toAdd;
    let toRemove;
    if (operation == 'add') {
      toAdd = 'selectedInstances';
      toRemove = 'avaliableInstances';
    }
    else if (operation == 'remove') {
      toAdd = 'avaliableInstances';
      toRemove = 'selectedInstances';
    }
    this[toAdd].push(instance);
    let index = this[toRemove].indexOf(instance);
    if (index > -1) {
      this[toRemove].splice(index, 1);
    }

  }

}
