// login.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { catchError, filter, finalize, map, of, switchMap, takeUntil } from 'rxjs';
import { CoreComponent } from '../../shared/components/core/core.component';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/interfaces/user';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent extends CoreComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _toastService = inject(ToastService);

  isLoading = signal(false);
  loginForm: FormGroup = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required,]
  });

  onSubmit(): void {
    let authToken: string

    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.isLoading.set(true);

    this._authService.login(username, password)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((authData) => {
          if (!!authData) {
            authToken = authData.token;
            return this._userService.all().pipe(
              map((users: any) => users.find((user: User) => user.username === username)),
              filter(user => !!user));
          }
          this.isLoading.set(false);
          return of(null)
        })
      ).subscribe((response: User) => {
        if (!!response) {
          this._authService.setLocalStorage(authToken, response);
          this._router.navigate(['/']);
          this._toastService.success(`Welcome back ${response.username}!`);
        }
      });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}