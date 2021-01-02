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
  public gotLat: string;
  public gotLng: string;
  constructor(public http: HttpClient) {  }
//TODO check timing
  getCityName(): void {
    this.getPosition().then(pos => {
      this.Lng = pos.lng.toFixed(5), this.Lat = pos.lat.toFixed(5),
      this.http.get(this.url + this.Lng + '%2C' + this.Lat).subscribe(response => {
          // @ts-ignore
          this.getCity = response.address.Subregion;
          this.currentCity = (JSON.stringify(this.getCity)).toLocaleLowerCase().slice(1, -1);
          this.dataFetched = true;
          this.getPlaceCoordinates();
        },
        error => {
          console.log(error.error);
        }
      );
    });
  }

  getPlaceCoordinates(): void {
    this.http.get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine='
      + this.currentCity +
      '&outFields=Match_addr,Addr_type').subscribe(response => {
        // @ts-ignore
        this.gotLng = response.candidates[0].location.y.toFixed(2).replace(".", "d");
        // @ts-ignore
        this.gotLat = response.candidates[0].location.x.toFixed(2).replace(".", "d");
      },
      error => {
        console.log(error.error);
      }
    );
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
