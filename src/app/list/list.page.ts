import { Component, OnInit } from "@angular/core";
import { ApiDataService } from "../services/api-data.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public items: Array<Object> = [];
  public merged:Object;
  constructor(private apidata: ApiDataService, private storage: Storage) {

  }

    ngOnInit() {
          this.getData();
    }

  getData(){
    this.storage.forEach((value, key, index) => {
      if (key != "police") {
      if (value.pregled["pregled"] == true) {
           this.merged={"ID":key, "Naslov":value.pregled["naslov"]};
           this.items.push(this.merged);
      }
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
}
