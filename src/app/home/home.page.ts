import { Component } from "@angular/core";
import { ApiDataService } from "../services/api-data.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  items: Array<Object>;
  input: string;
  shouldShowCancel: any;
  scrollCount: number;
  infinite_scroll:boolean;
  police: any;

  constructor(private apidata: ApiDataService, private storage: Storage) {
    this.getLatest();
  }

  ngOnInit() {
    this.police = {
      ids: [0, 1, 2, 3],
      imena: ["Računalništvo", "Umetnost", "Lingvistika", "Književnost"]
    };

    this.scrollCount = 1;
    this.items=[];
    this.storage.get("police").then(val => {
      if (val == null) {
        this.storage.set("police", this.police);
      }
    });
  }

  onClear(ev: any) {
    this.input=null;
    this.items=[];
    this.getLatest();
  }

  onCancel(ev: any) {
    this.input=null;
    this.items=[];
    this.getLatest();
  }

  getLatest(){
    this.infinite_scroll=false;
    this.apidata
      .getSearch(null, 1)
      .then(data =>{
        this.items = JSON.parse(data.data).results;
      });
  }

  getData(ev: any) {
    this.input = ev.target.value;
    this.infinite_scroll=true;
    if(this.input!=""){
      this.apidata
        .getSearch(this.input.toLowerCase(), 1)
        .then(data =>{
          this.items = JSON.parse(data.data).results;
        });
    }
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.scrollCount++;
      this.apidata
        .getSearch(this.input.toLowerCase(), this.scrollCount)
        .then(data =>
          JSON.parse(data.data).results.map(obj => {
            this.items.push(obj);
          })
        );
      infiniteScroll.target.complete();
    }, 500);
  }

}
