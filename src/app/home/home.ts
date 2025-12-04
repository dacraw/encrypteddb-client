import { Component, inject } from '@angular/core';
import { Encrypted } from '../services/encrypted';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly encryptedService = inject(Encrypted)
  results = [];

  fetchStaticValue(){
    this.encryptedService.getStaticValue().subscribe(data => {
      console.log(data)
    })
  }

  fetchEncryptedData(){
        this.encryptedService.getEncryptedData().subscribe(data => {
      console.log(data)
    })
  }

  fetchKeyVault(){
        this.encryptedService.getVaultKeySecret().subscribe(data => {
      console.log(data)
    })
  }

  
}
