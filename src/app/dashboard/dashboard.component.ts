import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDetailsService } from '../bank-details.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private bankService: BankDetailsService,
    private router: Router
  ) {}
  selectedCity = '';
  searchTerm = '';
  offset: number = 0;
  pageNumber: number = 1;
  pagesize: number = 10;
  banks: any;
  searchDone:boolean =false;
  gotValue:boolean=false;
  filterTerm:string='';

  ngOnInit(): void {
    // console.log("Set to true");
    this.changeSelectedCity('Bangalore');
    // localStorage.clear();
    // this.bankService.responseCache.clear();
  }

  changeSelectedCity(city) {
    this.gotValue=true;
    this.searchDone=false;
    this.searchTerm = '';
    this.selectedCity = city;
    // this.pagesize=10;
    this.offset=0;
    this.bankService.getByCity(city, this.pagesize, 0).subscribe(
      (response: any) => {
        // console.log(response);
        this.banks = response;
        this.gotValue=false;
        // console.log("Set to false");
      },
      (error: any) => {}
      
      );
      
    
  }
  
  keyPress(event: KeyboardEvent) {
    if (this.searchTerm != '' && event.code == 'Enter') {
      this.pageNumber = 0;
      this.gotValue=true;
      this.offset = 0;
      this.searchDone=true;
      this.bankService
        .getByBranchAuto(this.searchTerm, this.pagesize, this.offset)
        .subscribe(
          (response: any) => {
            // console.log(response);
            this.banks = response;
            this.gotValue=false;
          },
          (error: any) => {}
        );
    }
  }

  keyPressPageSize(event) {
    // console.log(event);
    if (this.pagesize != null && this.pagesize >= 10 && event.code == 'Enter') {
      if (!this.searchDone) {
        this.changeSelectedCity(this.selectedCity);
      } else {
        this.gotValue=true;
        this.bankService
          .getByBranchAuto(this.searchTerm, this.pagesize, this.offset)
          .subscribe(
            (response: any) => {
              // console.log(response);
              this.banks = response;
              this.gotValue=false;
            },
            (error: any) => {}
          );
      }
    }
  }

  previousPage() {
    this.offset = this.offset - this.pagesize;
    if (this.offset <= 0) {
      this.offset = 0;
    }

    if (!this.searchDone) {
      this.gotValue=true;
      this.bankService
        .getByCity(this.selectedCity, this.pagesize, this.offset)
        .subscribe(
          (response: any) => {
            // console.log(response);
            this.banks = response;
            this.gotValue=false;
          },
          (error: any) => {}
        );
    } else {
      this.gotValue=true;
      this.bankService
        .getByBranchAuto(this.searchTerm, this.pagesize, this.offset)
        .subscribe(
          (response: any) => {
            // console.log(response);
            this.banks = response;
            this.gotValue=false;
          },
          (error: any) => {}
        );
    }
  }

  showBankDetails(bankId: string) {
    this.bankService.getBankById(bankId).subscribe(
      (response) => {
        this.bankService.currbank = response;
        this.router.navigate(['/details']);
        // console.log(this.bankService.currbank);
      },
      (error) => {}
    );
  }

  nextPage() {
    this.offset = this.offset + this.pagesize;
    if (!this.searchDone) {
      this.gotValue=true;
      this.bankService
        .getByCity(this.selectedCity, this.pagesize, this.offset)
        .subscribe(
          (response: any) => {
            // console.log(response);
            this.banks = response;
            this.gotValue=false;
          },
          (error: any) => {}
        );
    } else {
      this.gotValue=true;
      this.bankService
        .getByBranchAuto(this.searchTerm, this.pagesize, this.offset)
        .subscribe(
          (response: any) => {
            // console.log(response);
            this.banks = response;
            this.gotValue=false;
          },
          (error: any) => {}
        );
    }
  }

  changeFavourite(id: string) {
    var curr = localStorage.getItem(id);
    if (curr == null || curr == 'no') {
      localStorage.setItem(id, 'yes');
    } else {
      localStorage.setItem(id, 'no');
    }
    // console.log(id + '  ' + localStorage.getItem(id));
  }

  checkFav(id: string) {
    var curr = localStorage.getItem(id);
    if (curr == null || curr == 'no') {
      return false;
    } else {
      return true;
    }
  }
}

export interface bank {
  ifsc: string;
  city: string;
  address: string;
  branch: string;
  state: string;
  bank_id: string;
  district: string;
  bank_name: string;
}
