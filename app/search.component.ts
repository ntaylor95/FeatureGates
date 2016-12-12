import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { FeatureGate } from './models/featureGate';
import { FeatureGatesService } from './services/feature-gates.service';
import { MyFilterPipe } from './feature-gate.search.pipe';

@Component({
  moduleId: module.id,
  selector: 'feature-gate-search',
  templateUrl: 'search.component.html',
  /*styleUrls: ['hero-search.component.css'],*/
  providers: [FeatureGatesService, MyFilterPipe]
})
export class FeatureGateSearchComponent implements OnInit {
  featureGates: Observable<FeatureGate[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private featureGatesService: FeatureGatesService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.featureGates = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.featureGatesService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<FeatureGate[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<FeatureGate[]>([]);
      });
  }

  gotoDetail(featureGate: FeatureGate): void {
    let link = ['/detail', featureGate.id];
    this.router.navigate(link);
  }
}
