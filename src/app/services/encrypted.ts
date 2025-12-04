import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Encrypted {
  private readonly httpClient = inject(HttpClient)

  public getEncryptedData(){
    return this.httpClient.get('https://localhost:7135/EncryptedData/EncryptedData', {withCredentials: true})
  }

  public getStaticValue(){
    return this.httpClient.get('https://localhost:7135/EncryptedData/StaticValue', {withCredentials: true})
  }

  public getVaultKeySecret(){
    return this.httpClient.get('https://localhost:7135/EncryptedData/vault-secret/Always-Encrypted-Auto3', {withCredentials: true})
  }
}
