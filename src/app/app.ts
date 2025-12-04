import { NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  isLoggedIn = false;
  username = '';

  protected readonly title = signal('encrypteddb-client');

  constructor(private msalService: MsalService) {}

  async ngOnInit() {
    await this.msalService.instance.initialize();
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.msalService.instance.getAllAccounts().length > 0;
    this.username = this.msalService.instance.getAllAccounts()[0].username
  }

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }
}

