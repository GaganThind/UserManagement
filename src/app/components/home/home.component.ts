import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hotels: Hotel[];

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
    this.hotels = this.getHotelList();
  }

  private getHotelList(): Hotel[] {
    let hotels: Hotel[] = [];

    let taj = new Hotel();
    taj.name = "Taj";
    taj.address = "Mumbai";
    taj.image="http://3.bp.blogspot.com/-Mny9xrIo_Yk/UpWCi1kkgoI/AAAAAAAANak/h9gH8p6BZX8/s1600/Taj+Mahal+hotel.jpg";
    hotels.push(taj);

    let jw = new Hotel();
    jw.name = "JW Marriot";
    jw.address = "Mumbai";
    jw.image = "https://www.luxurylifestylemag.co.uk/wp-content/uploads/2018/05/JW-Marriott-Mumbai-Exterior.jpg";
    hotels.push(jw);

    return hotels;
  }

}
