import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WalletService } from '../services/wallet.service';

import { CapacitorPassToWallet } from 'capacitor-pass-to-wallet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private walletService: WalletService,
    private loader: LoadingController
  ) {}

  public async addToWallet(){
    const loading = await this.loader.create({
      duration: 2000,
      message: 'Please wait'
    });
    await loading.present();
    try {
      const res = await this.walletService.downloadPkpass('pass');
      const base64 = await this.walletService.convertBlobToBase64(res) as string;
      await CapacitorPassToWallet.addToWallet({base64});
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }

  public async addMultipleToWallet(){
    const loading = await this.loader.create({
      duration: 2000,
      message: 'Please wait'
    });
    await loading.present();
    try {
      const res = await this.walletService.downloadPkpass('pass');
      const base64 = await this.walletService.convertBlobToBase64(res) as string;
      const res2 = await this.walletService.downloadPkpass('pass2');
      const base642 = await this.walletService.convertBlobToBase64(res2) as string;
      await CapacitorPassToWallet.addMultipleToWallet({base64: [base64, base642]});
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }



}
