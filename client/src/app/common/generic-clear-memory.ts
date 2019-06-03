import { GenericClearMemoryModalComponent } from './generic-clear-memory-modal/generic-clear-memory-modal.component';
import { MatDialog } from '@angular/material';
import { Utilities } from './utlilities';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { ThsDataService } from '../services/ths-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { Injectable } from '@angular/core';

@Injectable()
export default class GenericClearMemory {
    private sessionKeys: string[] = [
        'patient-id',
        'tests-data',
        'tfi-dataRecord',
        'tfi-currentState',
        'ths-dataRecord',
        'ths-history',
        'ths-currentState',
        'ts-dataRecord',
        'ts-history',
        'ts-currentState',
        'nextComponent',
        'last-name',
        'email',
        'first-name',
        'appt'
    ];

    constructor(
        private dialog: MatDialog,
        private tsDataService: TsScreenerDataService,
        private thsDataService: ThsDataService,
        private tfiDataService: TfiDataService) { }

        /**
         * Call this anytime you want to clear all patient/appointment data stored in client services or sessionMemory.
         * If there is no data to clear, this will call onSuccess().
         * @param warn Whether to display the modal asking the user to confirm clear memory
         * @param onSuccess Callback if memory is cleared, called if warn is false, or if user selects 'continue'
         * @param onCancel Callback if user selected 'cancel' so memory was not cleared.
         */
    public clearMemory(warn: boolean, onSuccess: () => void, onCancel?: () => void): void {
        if (!this.hasData()) {
            onSuccess();
        } else {
            if (warn) {
                const dialogRef = this.dialog.open(GenericClearMemoryModalComponent);
                dialogRef.afterClosed().subscribe((result) => {
                    if (result === 'confirm') {
                        this.clearData();
                        onSuccess();
                    } else if(onCancel !== undefined) {
                        onCancel();
                    }
                });
            } else {
                this.clearData();
                onSuccess();
            }
        }
    }

    private hasData(): boolean {
        return (
            this.sessionKeys.some((val) => {
                return Utilities.getSessionStorage(val) !== null;
            }) ||
            this.tsDataService.dataRecord.length !== 0 ||
            this.thsDataService.dataRecord.length !== 0 ||
            this.tfiDataService.dataRecord.length !== 0
        );
    }

    private clearData(): void {
        // clear all patient data in memory
        this.sessionKeys.forEach((value) => {
            Utilities.removeItemFromSessionStorage(value);
        });
        this.tsDataService.clearHistory();
        this.thsDataService.clearHistory();
        this.tfiDataService.clearHistory();
    }
}