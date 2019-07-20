import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PoetryService {
    httpService = new HttpService();

    getPoetryList(): Observable<any> {
        const url = 'https://raw.githubusercontent.com/soyaine/FE-Practice/f438d3bdf099461f88322b1b1f20c9d58f66f1ec/TangPoetryCut.json';
        return this.httpService.get(url);
    }
}
