import { Component, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { OurServicesService, Service } from 'src/app/services/our-services.service';

@Component({
  selector: 'app-services',
  templateUrl: './our-services-widget.component.html',
  styleUrls: ['./our-services-widget.component.scss']
})
export class OurServicesWidgetComponent implements OnInit {
  configURL = "api/services"

  services?: Service[];

  @Input() selectable = false;
  @Output() selected_service?: Service;

  constructor(private ourServicesService: OurServicesService) { }

  chooseService(service: Service) {
    this.selected_service = service;
  }

  ngOnInit(): void {
    // Request list of services from server on component load
    this.ourServicesService.getServices().subscribe(response => this.services = response)
  }

}
