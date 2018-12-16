import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.page.html",
  styleUrls: ["./favorites.page.scss"]
})
export class FavoritesPage implements OnInit {
  private selectedItem: any;
  public items: Array<Object> = [];
  public merged: Object;
  public policaList: Array<Object> = [];
  constructor(private storage: Storage) {
    this.getData();
  }

  getData() {
    this.storage.forEach((value, key, index) => {
      if (key == "police") {
        this.policaList = value["imena"];
      } else if (key != "police") {
        if (value.favorite["fav"] == true) {
          this.merged = {
            ID: value.favorite["dataObj"].ID,
            Naslov: value.favorite["dataObj"].Naslov,
            Polica: Number(value.favorite["polica"])
          };
          this.items.push(this.merged);
        }
        this.items = this.items.sort((obj1, obj2) => {
          return obj1["Polica"] - obj2["Polica"];
        });
      }
    });
  }

  doRefresh(event) {
    this.items = [];
    this.getData();

    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {}
}
