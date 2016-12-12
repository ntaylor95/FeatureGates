import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { PeopleListComponent } from './people-list.component';
import { PersonDetailsComponent } from './person-details.component';

import { FeatureGatesService } from './services/feature-gates.service';
import { FeatureGateListComponent } from './feature-gate-list.component';
import { FeatureGateSearchComponent } from './search.component';

import { MyFilterPipe } from './feature-gate.search.pipe';


@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [ AppComponent, PeopleListComponent, PersonDetailsComponent, FeatureGateListComponent, FeatureGateSearchComponent, MyFilterPipe],
  providers: [ FeatureGatesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
