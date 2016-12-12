import { Component, OnInit } from '@angular/core';
import { FeatureGate } from './models/featureGate';
import { FeatureGatesService } from './services/feature-gates.service';
import { MyFilterPipe } from './feature-gate.search.pipe';

@Component({
  selector: 'feature-gate-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
    Loading our hyperdrives!!! Retrieving data...
    </section>
    
    <div id="search-component">
    <h4>Feature Gate List</h4>
    <!--<input #searchBox id="search-box" (keyup)="search(searchBox.value)" />-->
    <input #searchBox id="search-box" (keyup)="0" placeholder="Search"/>
    <div>
    <!--<div *ngFor="let featureGate of featureGates | async"
         (click)="gotoDetail(featureGate)" class="search-result" >
      {{featureGate.featureTitle}}
    </div>-->

    <div *ngFor="let featureGate of featureGates | myfilter:searchBox.value"
         (click)="onSelect(featureGate)" class="search-result" >
      {{featureGate.featureTitle}}
    </div>

    </div>
  </div>
    <ul>
        <section *ngIf="searchBox.value.length==0">
          <li *ngFor="let featureGate of featureGates" (click)="onSelect(featureGate)">
            <a href="#" [routerLink]="['/persons', featureGate.id]">
              {{featureGate.featureTitle}}
            </a>
            <div style="margin-left:5px;">
              {{featureGate.description}}
            </div>
          </li>
        </section>
        
        <section *ngIf="searchBox.value.length>0">   
          <!-- this is the new syntax for ng-repeat -->
          <li *ngFor="let featureGate of featureGates | myfilter:searchBox.value" (click)="onSelect(featureGate)">
              <a href="#" [routerLink]="['/persons', featureGate.id]">
            {{featureGate.featureTitle}}
            </a>
            <div style="margin-left:5px;">
              {{featureGate.description}}
            </div>
          </li>
        </section>
      </ul>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
  </section>
  `
})
export class FeatureGateListComponent implements OnInit{
  featureGates: FeatureGate[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  selectedFeatureGate: FeatureGate;

  constructor(private featureGatesService : FeatureGatesService){}

  ngOnInit(){
    this.featureGatesService
      .getAll()
      .subscribe(
        /* happy path */ p => this.featureGates = p,
        /* error path */ e => this.errorMessage = e,
        /* onComplete */ () => this.isLoading = false);
  }

  onSelect(featureGate: FeatureGate): void {
    this.selectedFeatureGate = featureGate;
    console.log(this.selectedFeatureGate.id)
  }

  gotoDetail(){
    console.log(this.selectedFeatureGate.id)
    //let link = ['/persons'];
    //this.router.navigate(link);
  }
}
