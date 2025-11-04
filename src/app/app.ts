// src/app/app.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  isLoggedIn = false;

  protected readonly title = signal('encrypteddb-client');

  constructor(private msalService: MsalService) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Check for an active account
    this.isLoggedIn = this.msalService.instance.getAllAccounts().length > 0;
  }

  login() {
    // Uses the Redirect flow (recommended)
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }
}

// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('encrypteddb-client');
// }
