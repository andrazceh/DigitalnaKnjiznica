import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from "../../services/api-data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  constructor(private route: ActivatedRoute, private apidata: ApiDataService, private router:Router) { }
  private query:string;
  public items:Array<Object>;
  scrollCount: number;
  public advanced:boolean;
  public infiniteScroll:boolean;
  public areResults:boolean;
  ngOnInit() {
    this.items=[];
    this.scrollCount=1;
    this.query=this.route.snapshot.paramMap.get("query");
    this.areResults=false;
    if(this.query.substring(0,2)=="ad"){
      this.infiniteScroll=true;
      this.advanced=true;
      this.query=this.query.slice(2,this.query.length);
      this.apidata
        .getAdvancedSearch(this.query, 1)
        .then(data =>{
          this.items=JSON.parse(data.data).results;
        });
    }else if(this.query.substring(0,2)=="br"){
      this.advanced=false;
      this.infiniteScroll=false;
      this.query=this.query.slice(2,this.query.length);
      if(this.query.includes("cat3")){

        this.apidata
          .getBrowse(this.query, 1)
          .then(data =>{
            this.areResults=true;
            this.advanced=false;
            this.infiniteScroll=true;
            this.items=[];
            this.items=JSON.parse(data.data).results;
          });
      }else if(this.query.includes("cat2")){
        this.apidata
          .getBrowse(this.query, 1)
          .then(data =>{
            if('cat3' in JSON.parse(data.data))this.items=JSON.parse(data.data).cat3;
            if('results' in JSON.parse(data.data)){
              this.areResults=true;
              this.advanced=false;
              this.infiniteScroll=true;
              this.items=[];
              this.items=JSON.parse(data.data).results;
              console.log(this.items);
            }
          })
      }else if(this.query.includes("cat1")){
        this.apidata
          .getBrowse(this.query, 1)
          .then(data =>{
            this.items=JSON.parse(data.data).cat2;
          });
      }

    }
  }
  getBrowse(value){

    if(!this.query.includes("cat2")){
      if(this.query.substring(0,2)=="br"){
        this.query=this.query+"&cat2="+value;
      }else{
        this.query="br"+this.query+"&cat2="+value;
      }
    }
    if(!this.query.includes("cat3")){
      this.query=this.query+"&cat3="+value;
      /**if(this.query.includes("br")){
        this.query=this.query.split('cat1')[1];
        this.query="cat1"+this.query;
      }**/
    }else{
      
    }


    console.log(this.query);
    this.router.navigate(['/results', this.query]);

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.scrollCount++;
      this.apidata
        .getBrowse(this.query, this.scrollCount)
        .then(data =>
          JSON.parse(data.data).results.map(obj => {
            this.items.push(obj);
          })
        );
      infiniteScroll.target.complete();
    }, 500);
  }
}
