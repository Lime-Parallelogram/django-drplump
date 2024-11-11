import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

export interface Service {
  ID: number;
  Name: string;
  Description: string;
  Price: any;
  ImageURL: any;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  configURL = "api/services"

  service = {
    Name: "Name",
    Description: "This is the description",
    ImageURL: "TestURL"
  };
  services: any;

  constructor(private http: HttpClient) { }

  getServices() {
    let requests = this.http.get(this.configURL).pipe(retry(3));
    requests.subscribe(response => this.services = response)
    console.log("Services", this.services)
  }

  chooseService(serviceID: number) {
    console.log(serviceID)
  }

  handleError(error: HttpErrorResponse) {
    console.error(error.error)
  }

  ngOnInit(): void {
    let allServices = this.getServices()
    console.log(allServices)
  }

}
