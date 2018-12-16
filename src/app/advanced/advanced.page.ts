import { Component, OnInit } from "@angular/core";
import { ApiDataService } from "../services/api-data.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-advanced",
  templateUrl: "./advanced.page.html",
  styleUrls: ["./advanced.page.scss"]
})
export class AdvancedPage implements OnInit {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  stolpec1: string;
  stolpec2: string;
  stolpec3: string;
  stolpec4: string;
  operator1: string;
  operator2: string;
  operator3: string;

  operators: string;
  inputs: string;
  stolpci: string;

  query: string;

  constructor(private apidata: ApiDataService,private router: Router) {}

  ngOnInit() {
    this.operator1 = "and";
    this.operator2 = "and";
    this.operator3 = "and";
    this.stolpec1 = "naslov";
    this.stolpec2 = "avtor";
    this.stolpec3 = "opis";
    this.stolpec4 = "letoIzida";
    this.input1 = "";
    this.input2 = "";
    this.input3 = "";
    this.input4 = "";
  }
//sestavim query
  getData() {
    this.operators =
      "op1=" +
      this.operator1 +
      "&op2=" +
      this.operator2 +
      "&op3=" +
      this.operator3;
    this.inputs =
      "val1=" +
      this.input1 +
      "&val2=" +
      this.input2 +
      "&val3=" +
      this.input3 +
      "&val4=" +
      this.input4;
    this.stolpci =
      "col1=" +
      this.stolpec1 +
      "&col2=" +
      this.stolpec2 +
      "&col3=" +
      this.stolpec3 +
      "&col4=" +
      this.stolpec4;
    this.query = "ad"+
      this.operators + "&" + this.inputs + "&" + this.stolpci + "&page=" + 1;

      this.router.navigate(['/results', this.query]);

  }
}
