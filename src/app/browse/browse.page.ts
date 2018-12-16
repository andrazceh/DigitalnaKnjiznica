import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-browse",
  templateUrl: "./browse.page.html",
  styleUrls: ["./browse.page.scss"]
})
export class BrowsePage implements OnInit {
  public items: Array<Object>;
  public query: string;
  constructor(private router:Router) {}

  ngOnInit() {
    this.items = [
      { value: "avtor", name: "Avtor" },
      { value: "naslov", name: "Naslov" },
      { value: "zaloznik", name: "Založnik" },
      { value: "letoIzida", name: "Leto Izida" },
      { value: "jezik", name: "Jezik" }
    ];
  }

  getBrowse(value) {
    this.query="br"+"cat1="+value;
    this.router.navigate(['/results', this.query]);
  }
}
