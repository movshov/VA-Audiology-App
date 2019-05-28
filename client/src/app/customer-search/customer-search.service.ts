import { Injectable } from '@angular/core';
import { ServerApiService } from '../services/server-api.service';
import { Appointment } from '../../../../api-objects/appointment';
import { Response } from '../../../../api-objects/GenericResponse';
import { parse } from 'json2csv';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomerSearchService {

    constructor(private service: ServerApiService) { }

    public searchApiService(PatientId: string): Observable<Response<Appointment[]>> {
        return this.service.get<Appointment[]>('appointments', new Map([['id', PatientId]]));
    }

    public deleteAppointment(appointmnetId: number): Observable<Response<null>> {
        return this.service.delete<null>('appointments/' + appointmnetId);
    }

    public getAllAppointments(): Observable<Response<Appointment[]>> {
        return this.service.get<Appointment[]>('appointments').pipe(
            tap(
                (response: Response<Appointment[]>) => {
                    try {
                        const csvString = parse(response.data);
                        const now = new Date();
                        this.downloadFile(csvString, 'VA-AllAppointments_' + now.getDay() + '-' + now.getMonth() + '-' + now.getDate() + '.csv');
                    } catch (error) {
                        alert(error.message);
                    }
                }
            )
        );
    }

    public downloadFile(data: any, fileName: string) {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const fileUrl = window.URL.createObjectURL(blob);
        let anchor = document.createElement('a');
        anchor.download = fileName;
        anchor.href = fileUrl;
        anchor.click();
    }
}
