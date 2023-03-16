import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  getTodayDateString(today: Date){
    // const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth();
    const date = today.getDate();
    let newMonth = "";
    if (month !== 10 && month !== 11 && month !== 12){
      newMonth = `0${month+1}`;
    } 
    else {
      newMonth = `${month}`;
    }
    return `${year}-${newMonth}-${date}`;
  }
  
  getTodayTimeString(today: Date){
    const hour = this.transformToDoubleDigitString(today.getHours());
    const minute = this.transformToDoubleDigitString(today.getMinutes());
    const second = this.transformToDoubleDigitString(today.getSeconds());
    return `${hour}:${minute}:${second}`;
  }

  getTodayDateTimeString(today: Date){
    const date = this.getTodayDateString(today);
    const time = this.getTodayTimeString(today);
    return `${date} ${time}`;
  }

  transformToDoubleDigitString(num: number){
    let newNum;
    if (num < 10){
      newNum = `0${num}`;
    }
    else{
      newNum = num;
    }
    return newNum;
  }
}
