import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import { DocumentViewer} from '@ionic-native/document-viewer/ngx';
@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.page.html",
  styleUrls: ["./viewer.page.scss"]
})
export class ViewerPage implements OnInit {
  private passedId = null;
  public pdfSrc: string;
  public NiDatoteke: boolean;
  public sporocilo: string;
  public pageVariable = 1;
  public input: string;
  buttonPregled: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private document: DocumentViewer,
    ) {
    this.NiDatoteke = false;
    this.passedId = this.activatedRoute.snapshot.paramMap.get("id");
    let temp;
    this.buttonPregled = "#28a745";
          this.passedId;
            this.storage.get(this.passedId).then(val => {
                this.document.viewDocument(val.pregled["url"],'application/pdf',{});
            });
  }

  ngOnInit() {}

  addToPregled() {
    this.storage.get(this.passedId).then(val => {
      if (val.pregled == true) {
        this.buttonPregled = "#4e4e4e";
        this.modify("pregled", false, val);
      } else {
        this.buttonPregled = "#28a745";
        this.modify("pregled", true, val);
      }
    });
  }

  modify(attr, value, data) {
    let copyObject;
    copyObject = data;
    copyObject[attr] = value;
    this.storage.set(this.passedId, copyObject);
  }
}
