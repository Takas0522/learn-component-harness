import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  get$(): Observable<{id: number, name: string}[]> {
    const val = Array.from(new Array(10)).map((_, i) => {
      const ret = { id: i, name: `${i}さん` };
      return ret;
    });
    return of(val);
  }

}
