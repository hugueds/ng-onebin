import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';


import { MixService } from "app/services/mix.service";
import { SocketService } from "app/services/socket.service";

import { AppComponent } from './app.component';
import { MixComponent } from './mix/mix.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaktComponent } from './takt/takt.component';
import { PartComponent } from './part/part.component';
import { AlertsComponent } from './alerts/alerts.component';
import { BoxComponent } from './alerts/box/box.component';
import { PopActiveDirective } from './shared/pop-active.directive';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from "app/app.routing.module";


@NgModule({
  declarations: [
    AppComponent,
    MixComponent,
    ConfigurationComponent,
    NavbarComponent,
    TaktComponent,
    PartComponent,
    AlertsComponent,
    BoxComponent,
    PopActiveDirective,
    AboutComponent,
    MainComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule, FormsModule
  ],
  providers: [MixService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
