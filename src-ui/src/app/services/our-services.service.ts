import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';

// Defines how a service is represented in the database on the server
export interface Service {
  ID: number;
  Name: string;
  Description: string;
  Price: any;
  ImageURL: any;
}

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {

  constructor(private http: HttpClient) { }

  /**
   * Get list of the services that plump currently offers
   * @returns An observable containing all currently available treatments at the clinic
   */
  getServices(): Observable<Service[]> {
    return this.http.get("api/services").pipe(retry(3)).pipe(
      map(resp => <Service[]>resp)
    );
  }

}
