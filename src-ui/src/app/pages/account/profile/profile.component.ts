import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  name?: string;
  errorText?: string;

  constructor(private userService: UserService) {
    this.name = userService.authenticatedUser?.name;
  }

  submitClick() {
    
  }

}
