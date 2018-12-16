import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiDataService } from "../../services/api-data.service";
import { Storage } from "@ionic/storage";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { Toast } from "@ionic-native/toast/ngx";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-publikacija",
  templateUrl: "./publikacija.page.html",
  styleUrls: ["./publikacija.page.scss"]
})
export class PublikacijaPage implements OnInit {
  passedId = null;
  langSwitch: boolean;
  title: string;
  publikacija: Object;
  isDataAvailable: boolean = false;
  buttonColors: string[] = ["#FF6F61", "#28a745", "#4e4e4e"];
  buttonHeart: any;
  buttonPregled: any;
  settingsObject: any;
  policeInput: Object[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apidata: ApiDataService,
    private storage: Storage,
    private transfer: FileTransfer,
    private file: File,
    private toast: Toast,
    public alertController: AlertController
  ) {
    this.passedId = this.activatedRoute.snapshot.paramMap.get("id");
    this.settingsObject = {
      favorite: { fav: false, polica: "", dataObj: "" },
      pregled: { pregled: false, url: "", naslov: "" }
    };
  }

  ngOnInit() {
    this.storage.get("police").then(val => {
      if (val != null) {
        this.policeInput=this.getPoliceList();
      }
    });
    this.storage.get(this.passedId).then(val => {
      if (val == null) {
        this.storage.set(this.passedId, this.settingsObject);
        this.apidata.getById(this.passedId).then(data => {
          this.publikacija = JSON.parse(data.data);
          this.isDataAvailable = true;
        });
      } else {
        if (val.favorite["fav"] == true) {
          this.buttonHeart = this.buttonColors[0];
          this.publikacija = val.favorite["dataObj"];
          this.isDataAvailable = true;
        } else {
          this.apidata.getById(this.passedId).then(data => {
            this.publikacija = JSON.parse(data.data);
            this.isDataAvailable = true;
          });
        }
        if (val.pregled["pregled"] == true)
          this.buttonPregled = this.buttonColors[1];
      }
    });
  }

  modify(attr, value, data) {
    let copyObject;
    copyObject = data;
    copyObject[attr] = value;
    this.storage.set(this.passedId, copyObject);
  }

  addToFavs() {
    this.storage.get(this.passedId).then(val => {
      if (val.favorite["fav"] == true) {
        this.buttonHeart = this.buttonColors[3];
        this.modify("favorite", { fav: false, polica: "", dataObj: "" }, val);
      } else {
        this.presentAlertRadio(val);
      }
    });
  }

  showToast(text) {
    return this.toast.show(text, "3000", "center").subscribe(toast => {
      console.log(toast);
    });
  }
  addToPregled() {
    this.storage.get(this.passedId).then(val => {
      if (val.pregled == true) {
        this.buttonPregled = this.buttonColors[3];
        this.modify("pregled", false, val);
      } else {
        this.apidata.getDoc(this.passedId).then(data => {
          if (
            data.data == "NiDatoteke!" ||
            data.data.substring(0, 3) == "URL"
          ) {
            this.buttonPregled = this.buttonColors[3];
            this.showToast(
              `Datoteka ne obstaja, ali pa je ni mogoče prenesti!`
            );
            this.modify(
              "pregled",
              { pregled: false, url: "", naslov: "" },
              val
            );
          } else {
            this.showToast(`Prenašam Datoteko`);
            this.buttonPregled = this.buttonColors[1];
            const transfer = this.transfer.create();
            transfer
              .download(
                "https://repozitorij.uni-lj.si/ajax.php?cmd=getDoc&gID=" +
                  this.passedId,
                this.file.dataDirectory + this.passedId + ".pdf"
              )
              .then(entry => {
                let url = entry.toURL();
                this.apidata.getById(this.passedId).then(data => {
                  this.modify(
                    "pregled",
                    {
                      pregled: true,
                      url: url,
                      naslov: JSON.parse(data.data).Naslov
                    },
                    val
                  );
                  this.showToast(`Dodano v pregled...`);
                });
              });
          }
        });
      }
    });
  }

  getPoliceList() {
    let inputList = [];
    this.storage.get("police").then(val => {
      let flag=false;
      val.imena.forEach(function(value, index) {
        flag=false;
        if(index==0)flag=true;
        inputList.push ({
          type: "radio",
          name: value + index,
          label: value,
          value: index,
          checked: flag
        });
      });
    });
    return inputList;
  }

  async presentAlertRadio(oldObject) {
    const alert = await this.alertController.create({
      header: "Izberi polico",
      inputs: this.policeInput,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.modify("favorite", { fav: false, polica: "", dataObj: "" }, oldObject);
          }
        },
        {
          text: "Ok",
          handler: data => {
            this.modify(
              "favorite",
              { fav: true, polica: data, dataObj: this.publikacija },
              oldObject
            );
            this.buttonHeart = this.buttonColors[0];
          }
        }
      ]
    });

    await alert.present();
  }
}
