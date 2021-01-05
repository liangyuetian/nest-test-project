import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class CatsService {
    httpService = new HttpService();

    constructor(
        // private readonly httpService: HttpService,
    ) {
        // const url = 'https://raw.githubusercontent.com/soyaine/FE-Practice/f438d3bdf099461f88322b1b1f20c9d58f66f1ec/TangPoetryCut.json';
        // this.httpService.get(url).subscribe(data => {
        //     // console.log(data);
        // });
    }

    getAssetQuery(): Observable<AxiosResponse<[]>> {
        return this.httpService.get('http://localhost:3000/asset/query');
    }
}
