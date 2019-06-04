import { ClearDataModalComponent } from './clear-data-modal/clear-data-modal.component';
import { MatDialog } from '@angular/material';
import { Utilities } from './utlilities';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { ThsDataService } from '../services/ths-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { Injectable } from '@angular/core';

@Injectable()
export default class ClearData {
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
     * Call this anytime you want to clear all patient/appointment data stored in client services or session memory.
     * A warning will be displayed asking the user to confirm. 
     * Exception: If there is no data to clear, this will call onSuccess() without warning dialog.
     * @param onSuccess Callback if memory is cleared, called if user selects 'continue'
     * @param onCancel Callback if user selected 'cancel' so memory was not cleared.
     */
    public askToClearData(onSuccess: () => void, onCancel?: () => void): void {
        if (!this.hasData()) {
            onSuccess();
        } else {
            const dialogRef = this.dialog.open(ClearDataModalComponent);
            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'confirm') {
                    this.clearData();
                    onSuccess();
                } else if (onCancel !== undefined) {
                    onCancel();
                }
            });
        }
    }

    /**
     * Call this to clear all patient/appointment data stored in client sevices or session memory.
     * No warning dialog is displayed.
     */
    public clearData(): void {
        // clear all patient data in memory
        this.sessionKeys.forEach((value) => {
            Utilities.removeItemFromSessionStorage(value);
        });
        this.tsDataService.clearHistory();
        this.thsDataService.clearHistory();
        this.tfiDataService.clearHistory();
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
}