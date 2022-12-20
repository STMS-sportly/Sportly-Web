import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';


@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
  exports: [AngularFireAuthModule]
})
export class AppFirebaseModule { }
