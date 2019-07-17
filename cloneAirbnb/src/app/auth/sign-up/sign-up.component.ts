import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SignUpObj } from 'src/app/core/interface/signUp.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  singUp: FormGroup;
  passwordDisplay = true;
  months: number[];
  days: number[];
  years: number[];
  appUrl: string = environment.appUrl;
  userInfo: SignUpObj;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.months = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }

    this.days = [];
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }

    this.years = [];
    for (let i = 2019; i >= 1900; i--) {
      this.years.push(i);
    }

    this.singUp = this.fb.group({
      userEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ]
      ],
      userFirstName: [
        '',
        [
          Validators.required,
          Validators.pattern('[가-힣]{1,4}|[a-zA-Z. ]*[a-zA-Z]{1,60}$')
        ]
      ],
      userLastName: [
        '',
        [
          Validators.required,
          Validators.pattern('[가-힣]{1,4}|[a-zA-Z. ]*[a-zA-Z]{1,60}$')
        ]
      ],
      userPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9d$@$!%*?&].{8,}'
          )
        ]
      ],
      monthSelector: ['', [Validators.required]],
      daySelector: ['', [Validators.required]],
      yearSelector: ['', [Validators.required]]
    });
  }

  onSubmit(
    userEmail: HTMLInputElement,
    userFirstName: HTMLInputElement,
    userLastName: HTMLInputElement,
    userPassword: HTMLInputElement,
    birthMonth: HTMLSelectElement,
    birthDay: HTMLSelectElement,
    birthYear: HTMLSelectElement
  ) {
    console.log(
      userEmail.value,
      userFirstName.value,
      userLastName.value,
      userPassword.value,
      birthMonth.value,
      birthDay.value,
      birthYear.value
    );

    const userFullName = `${userFirstName.value} ${userLastName.value}`;
    const userBirth = `${birthMonth.value}/${birthDay.value}/${
      birthYear.value
    }`;

    // 리스폰 콘솔로 찍어보기
    const payload: SignUpObj = {
      username: userFullName,
      password: userPassword.value,
      email: userEmail.value
    };

    console.log(payload);

    this.http
      .post(`${this.appUrl}/accounts/user/`, payload)
      .subscribe(res => console.log(res));
    // this.location.back();
  }

  inputDivClicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #87CEFA';
  }

  inputDivUnclicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #bbb';
  }

  passwordClicked() {
    this.passwordDisplay = false;
  }

  get userEmail() {
    return this.singUp.get('userEmail');
  }

  get userFirstName() {
    return this.singUp.get('userFirstName');
  }

  get userLastName() {
    return this.singUp.get('userLastName');
  }

  get userPassword() {
    return this.singUp.get('userPassword');
  }
}
