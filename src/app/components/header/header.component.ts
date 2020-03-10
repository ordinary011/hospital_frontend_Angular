import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/services/transfer.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;

  constructor(
    private router: Router,
    private transfer: TransferService,
    private auth: AuthService
  ) {}

  // when we load the header we need to know whether the patient is logged in or not, cause we have different buttons to display for logged user
  ngOnInit() {
    this.transfer.telecast.subscribe((msg: string) => {
      if (localStorage.getItem('token')) this.isLogged = true;
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLogged = false
    this.router.navigate(['logIn'])
  }

  // this method is used for searching the doctor. it navigates router outlet to the search component
  async findDoctor(searchForm) {
    if (searchForm.invalid) alert('search field can not be empty');
    else {
      // we use here transfer service because we want to deliver text from input search field (that is located in the header) to the search component
      // we are transferring doctor's name
      await this.transfer.toDoctorSearch(searchForm.value.doctorName);

      // we need to reload the component again because if the user types another name at his second attempt the router will not reload the component. so we use switcching between components here
      this.router
        .navigateByUrl('', { skipLocationChange: true })
        .then(() => this.router.navigate(['search']));
    }
  }
}
