import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from "app/configuration/configuration.component";
import { AboutComponent } from "app/about/about.component";
import { MainComponent } from "app/main/main.component";

const routes: Routes = [
   { path: '', component: MainComponent, /* canActivate : [DeviceGuard]  */ },    
   { path: 'configuration', component: ConfigurationComponent,  /* canActivate : [DeviceGuard]  */},    
   { path: 'about', component: AboutComponent,  /* canActivate : [DeviceGuard] */  },    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }