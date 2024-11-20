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
import { AuthenticatedUserGuard } from './guards/authenticated-user.guard';
import { LoginComponent } from './pages/login/login.component';
import { NavbarAccountComponent } from './global/widgets/navbar-account/navbar-account.component';
import { FormsModule } from '@angular/forms';
import { ReviewPanelComponent } from './global/widgets/review-panel/review-panel.component';

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
    ConfirmComponent,
    LoginComponent,
    NavbarAccountComponent,
    ReviewPanelComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'book', component: BookingComponent, children:[
        { path: '', component: ServiceChoiceComponent },
        { path: 'appointment-selection', component: AppointmentSelectionComponent, canActivate: [AuthenticatedUserGuard] },
        { path: 'pay', component: PaymentComponent, canActivate: [AuthenticatedUserGuard] },
        { path: 'paymentCallback', component: PaymentCallbackComponent, canActivate: [AuthenticatedUserGuard] },
        { path: 'confirm', component: ConfirmComponent, canActivate: [AuthenticatedUserGuard] }
      ] },
    ]),
    HttpClientModule,
    DayPilotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
