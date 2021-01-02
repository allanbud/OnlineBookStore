import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LocationService {

  private getCity: object;
  private url = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=PointAddress&preferredLabelValues=localCity&location=';
  private Lng: string;
  private Lat: string;
  public currentCity: string;
  public dataFetched = false;
  constructor(public http: HttpClient) {  }

  getCityName(): void {
    this.getPosition().then(pos => {
      this.Lng = pos.lng.toFixed(5), this.Lat = pos.lat.toFixed(5),
        console.log(`Positon:` + this.Lng + '  ' + this.Lat);
      this.http.get(this.url + this.Lng + '%2C' + this.Lat).subscribe(response => {
        // @ts-ignore
        this.getCity = response.address.Subregion;
        this.currentCity = (JSON.stringify(this.getCity)).toLocaleLowerCase().slice(1, -1);
        this.dataFetched = true;
      });
    });

  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

}
