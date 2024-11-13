import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OurServicesWidgetComponent } from './global/widgets/our-services-widget/our-services-widget.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './global/navbar/navbar.component';
import { FooterComponent } from './global/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { IndexComponent } from './pages/index/index.component';
import { BookingComponent } from './pages/booking/booking.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceChoiceComponent } from './pages/booking/service-choice/service-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    OurServicesWidgetComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    IndexComponent,
    BookingComponent,
    ServiceChoiceComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'about', component: AboutComponent },
      { path: 'book', component: BookingComponent },
    ]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
