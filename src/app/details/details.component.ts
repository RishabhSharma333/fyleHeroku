import { Component, OnInit } from '@angular/core';
import { BankDetailsService } from '../bank-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private bankService:BankDetailsService) { 

  }
  bankDetails:any;
  ngOnInit(): void {
    this.bankDetails=this.bankService.currbank;
    // console.log(this.bankDetails);
  }

}
