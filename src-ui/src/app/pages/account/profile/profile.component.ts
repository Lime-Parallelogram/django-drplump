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

  fileUploaded(event: any) {
    if (event.target.files.length > 0) {
      console.log("Uploading")
      this.userService.uploadProfilePhoto(event.target.files[0]).subscribe((response) => {
        console.log(response)
      })
    }
  }

  submitClick() {
    ///this.userService.updateProfile("steve", )
  }

}
