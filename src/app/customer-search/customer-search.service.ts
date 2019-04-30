import { Injectable } from '@angular/core';
import { ServerApiService } from '../services/server-api.service';
import { Appointment } from '../../../api-objects/appointment';
import { Response } from '../../../api-objects/GenericResponse';

import { Observable } from 'rxjs';

@Injectable()
export class CustomerSearchService {

    constructor(private service: ServerApiService) { }

    public searchApiService(PatientId: string): Observable<Response<Appointment[]>> {
        console.log('default send');
        return this.service.get<Appointment[]>('appointments', new Map([['id', PatientId]]));
    }
}
