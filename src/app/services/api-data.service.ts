import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";

@Injectable({
  providedIn: "root"
})
//Implementacija APIja
export class ApiDataService {
  constructor(private http: HTTP) {}

  getSearch(query, page) {
    return this.http.get(
      "https://repozitorij.uni-lj.si/ajax.php?&cmd=getSearch&source=dk&query=" +
        query +
        "&page=" +
        page +
        "&pageSize=" +
        20,
      {},
      {}
    );
  }

  getById(id) {
    return this.http.get(
      "https://repozitorij.uni-lj.si/ajax.php?cmd=getDocument&gID=" + id,
      {},
      {}
    );
  }
  getDoc(id) {
    return this.http.get(
      "https://repozitorij.uni-lj.si/ajax.php?cmd=getDoc&gID=" + id,
      {},
      {}
    );
  }

  getAdvancedSearch(query,page) {
    //values=to kaj uporabnik v text input
    //operators= IN, ALI. NE, NE IN
    //stolpci= kategorije(avtor, naslov...)
    return this.http.get(
      "https://repozitorij.uni-lj.si/ajax.php?cmd=getAdvancedSearch&source=dk&workType=0&language=0&" +query+"&page="+page,
      {},
      {}
    );
  }

  getBrowse(query, page){
    console.log("https://repozitorij.uni-lj.si/ajax.php?cmd=getBrowse&" +query+"&page="+page);
    return this.http.get(
      "https://repozitorij.uni-lj.si/ajax.php?cmd=getBrowse&" +query+"&page="+page,
      {},
      {}
    );
  }
}
