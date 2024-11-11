import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServicesComponent } from './services/services.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { IndexComponent } from './index/index.component';
import { BookingComponent } from './booking/booking.component';
import { MakebookingComponent } from './makebooking/makebooking.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceChoiceComponent } from './booking/service-choice/service-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    IndexComponent,
    BookingComponent,
    MakebookingComponent,
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
