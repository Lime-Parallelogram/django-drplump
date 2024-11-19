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
import { AppointmentSelectionComponent } from './pages/booking/appointment-selection/appointment-selection.component';
import { BookingsCalendarWidgetComponent } from './global/widgets/bookings-calendar-widget/bookings-calendar-widget.component';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { PaymentComponent } from './pages/booking/payment/payment.component';
import { PaymentCallbackComponent } from './pages/booking/payment-callback/payment-callback.component';
import { ConfirmComponent } from './pages/booking/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    OurServicesWidgetComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    IndexComponent,
    BookingComponent,
    ServiceChoiceComponent,
    AppointmentSelectionComponent,
    BookingsCalendarWidgetComponent,
    PaymentComponent,
    PaymentCallbackComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'about', component: AboutComponent },
      { path: 'book', component: BookingComponent, children:[
        { path: '', component: ServiceChoiceComponent },
        { path: 'appointment-selection', component: AppointmentSelectionComponent },
        { path: 'pay', component: PaymentComponent },
        { path: 'paymentCallback', component: PaymentCallbackComponent },
        { path: 'confirm', component: ConfirmComponent }
      ] },
    ]),
    HttpClientModule,
    DayPilotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
