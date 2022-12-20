import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {switchMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject(this.angularFireAuth.authState);
  user$: Observable<firebase.User | null> = this.user.pipe(
    switchMap((user) => user)
  );

  constructor(
    private readonly angularFireAuth: AngularFireAuth
    ) {}

  login(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
  });
    return from(
      this.angularFireAuth.signInWithPopup(provider)
      );
  }

  logout(): Observable<void> {
    return from(
      this.angularFireAuth.signOut()
      );
  }
}
