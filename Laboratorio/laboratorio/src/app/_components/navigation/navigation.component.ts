import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  logoutUser() {
    this.userSvc.logoutUser().subscribe(() => {
      // localStorage.clear(); // zabije vsetko v localstorage
      localStorage.removeItem('currentUser');
      this.userSvc.user = null;
      this.router.navigate(['/']);
    }, err =>{
      console.log('Nepodarilo sa odhlasit')
    })
  }
}
