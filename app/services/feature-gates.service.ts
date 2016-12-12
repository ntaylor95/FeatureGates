import { Injectable } from "@angular/core";
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FeatureGate } from "../models/featureGate";

@Injectable()
export class FeatureGatesService{
  constructor(private http : Http){}

  getAll(): Observable<FeatureGate[]>{
    let featureGates$ = this.http
      /*.get(`${this.baseUrl}/people`, {headers: this.getHeaders()})*/
      .get(`data/FeatureGate.json`, {headers: this.getHeaders()})
      .map(mapFeatureGates)
      .catch(handleError);
    return featureGates$;
  }

  search(term: string): Observable<FeatureGate[]> {
    return this.http
      /*.get(`app/heroes/?name=${term}`)*/
      .get(`data/FeatureGate.json`, {headers: this.getHeaders()})
      .map((r: Response) => r.json().data as FeatureGate[]);
  }

  /*get(id: number): Observable<FeatureGate> {
    let person$ = this.http
      .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
      .map(mapPerson);
    return person$;
  }

  save(featureGate: FeatureGate) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't
    // is read-only. But it would look like this:
    return this.http
      .put(`${this.baseUrl}/people/${person.id}`, JSON.stringify(person), {headers: this.getHeaders()});
  }*/

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapFeatureGates(response:Response): FeatureGate[]{
  // uncomment to simulate error:
  // throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results
  /*return response.json().data.map(toFeatureGate)*/
  return response.json().data.map(toFeatureGate)
}

function toFeatureGate(r:any): FeatureGate{
  let featureGate = r;  /*<FeatureGate>({
    id: r.id,
    featureName: r.featureName,
    featureKey: r.featureKey,
    featureDescription: r.featureDescription,
    environment: r.environment
  });*/
  console.log('Parsed feature gate:', featureGate);
  return featureGate;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
/*function extractId(personData:any){
  let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
  return parseInt(extractedId);
}*/

function mapFeatureGate(response:Response): FeatureGate{
  // toPerson looks just like in the previous example
  return toFeatureGate(response.json());
}

function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}



