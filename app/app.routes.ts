import { Routes, RouterModule } from '@angular/router';

import { PeopleListComponent } from './people-list.component';
import { PersonDetailsComponent } from './person-details.component';
import { FeatureGateListComponent } from './feature-gate-list.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: 'persons',
    component: PeopleListComponent,
  },
  // map '/persons/:id' to person details component
  {
    path: 'persons/:id',
    component: PersonDetailsComponent
  },
  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/featureGates',
    pathMatch: 'full'
  },
  {
    path: 'featureGates',
    component: FeatureGateListComponent,
  }
];

export const routing = RouterModule.forRoot(routes);
