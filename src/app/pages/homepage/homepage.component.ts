import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetListBootcampResponse } from '../../models/responses/bootcamp/get-list-bootcamp-response';
import { Bootcamp } from '../../models/responses/bootcamp/bootcamp';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  bootcamp:Bootcamp[]=[]
  constructor(private httpClient:HttpClient){}
  bootcampList:GetListBootcampResponse={
    items:this.bootcamp
  }

  ngOnInit(): void {
    this.getListBootCamp();
  }

  getListBootCamp(){
    this.httpClient
    .get<GetListBootcampResponse>("http://localhost:60805/api/Bootcamps?PageIndex=0&PageSize=10")
    .subscribe({
      next:(response:GetListBootcampResponse)=>{
        console.log("Cevap geldi :",response);
        this.bootcamp=response.items;
      },
      error:(error)=>{console.log("cevap hatalı :",error)},
      complete:()=>{console.log("istek sonlandı")}
    })
  }
}
