import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit {

  title = "Dr Plump - Scot, UK"

  constructor() { }

  ngOnInit(): void {
  }

}
