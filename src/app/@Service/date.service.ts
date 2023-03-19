import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  getTodayDateString(today: Date){
    // const today = new Date();
    const year = today.getFullYear();
    const month = this.transformToDoubleDigitString(today.getMonth()+1);
    const date = this.transformToDoubleDigitString(today.getDate());
    
    return `${year}-${month}-${date}`;
  }
  
  getTodayTimeString(today: Date){
    const hour = this.transformToDoubleDigitString(today.getHours());
    const minute = this.transformToDoubleDigitString(today.getMinutes());
    // const second = this.transformToDoubleDigitString(today.getSeconds());
    return `${hour}:${minute}`;
  }

  getTodayDateTimeString(today: Date){
    const date = this.getTodayDateString(today);
    const time = this.getTodayTimeString(today);
    const dateTime = new Date(`${date} ${time}`);
    return `${date}T${time}`;
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
