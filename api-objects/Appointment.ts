import { ThsAnswerStrings } from 'app/common/custom-resource-strings'
//'src/app/common/custom-resource-strings';

const AppointmentVariables: Array<string> = ['appointmentid', 'authorityid', 'patientid', 'deceased', 'patientnotes', 'appointmentdatetime', 'tympanometrytype', 'otoscopytype', 'rightear_lowf_severity', 'rightear_highf_severity', 'leftear_lowf_severity', 'leftear_highf_severity', 'rightear_lowf_configuration', 'rightear_highf_configuration', 'leftear_lowf_configuration', 'leftear_highf_configuration', 'audiogramtype', 'username', 'password', 'authorityname', 'authoritytype', 'tfi_i', 'tfi_sc', 'tfi_c', 'tfi_si', 'tfi_a', 'tfi_r', 'tfi_q', 'tfi_e', 'tfi_overallscore', 'ths_sectiona', 'ths_sectionb', 'ths_sectionc', 'ths_sectionc_example', 'ts_type']

export class Appointment {
    public appointmentid: number;
    public authorityid: number;
    public patientid: number;
    public deceased: boolean;
    public patientnotes: string;
    public appointmentdatetime: Date;
    public tympanometrytype: string;
    public otoscopytype: string;
    public rightear_lowf_severity: string;
    public rightear_highf_severity: string;
    public leftear_lowf_severity: string;
    public leftear_highf_severity: string;
    public rightear_lowf_configuration: string;
    public rightear_highf_configuration: string;
    public leftear_lowf_configuration: string;
    public leftear_highf_configuration: string;
    public audiogramtype: string;
    public username: string;
    public password: string;
    public authorityname: string;
    public authoritytype: number;
    public tfi_i: number;
    public tfi_sc: number;
    public tfi_c: number;
    public tfi_si: number;
    public tfi_a: number;
    public tfi_r: number;
    public tfi_q: number;
    public tfi_e: number;
    public tfi_overallscore: number;
    public ths_sectiona: number;
    public ths_sectionb: number;
    public ths_sectionc: number;
    public ths_sectionc_example: string;
    public ts_type: string;

    public createTfiMap() {
        return new Map<string, number>([['overallTFI', this.tfi_overallscore], ['intrusive', this.tfi_i], ['sense', this.tfi_sc], ['cognitive', this.tfi_c], ['sleep', this.tfi_si], ['auditory', this.tfi_a], ['relaxation', this.tfi_r], ['quality', this.tfi_q], ['emotional', this.tfi_e]]);
    }

    public createThsScoreMap() {
        return new Map<string, number>([['thsA', this.ths_sectiona], ['thsB', this.ths_sectionb], ['thsC', this.ths_sectionb]]);
    }
    public createThsTextVar() {
        return new Map<string, string>([['thsCtxt', this.getthsCtxt()], ['thsCex', this.ths_sectionc_example]]);
    }

    public testSeverityVars() {
        return new Map<string, string>([['audiogramType', this.audiogramtype], ['leftHighSev', this.leftear_highf_severity], ['leftLowSev', this.leftear_lowf_severity], ['rightHighSev', this.rightear_highf_severity], ['rightLowSev', this.rightear_lowf_severity], ['otoscopyType', this.otoscopytype], ['tympanometryType', this.tympanometrytype]]);
    }

    public testConfigVars() {
        return new Map<string, string>([['leftHighConfig', this.leftear_highf_configuration.replace(/;/g, ', ')], ['leftLowConfig', this.leftear_lowf_configuration.replace(/;/g, ', ')], ['rightHighConfig', this.rightear_highf_configuration.replace(/;/g, ', ')], ['rightLowConfig', this.rightear_lowf_configuration.replace(/;/g, ', ')]]);
    }
    answerStrings = new ThsAnswerStrings();

    public getthsCtxt() {
        // let answerStrings = new ThsAnswerStrings();
        switch (this.ths_sectionc) {
            case 1:
                return this.answerStrings.NO;
            case 2:
                return this.answerStrings.SMALL_YES;
            case 3:
                return this.answerStrings.MODERATE_YES;
            case 4:
                return this.answerStrings.BIG_YES;
            case 5:
                return this.answerStrings.VERY_BIG_YES;
        }
    }

    constructor(clone?: Appointment) {
        if (clone) {
            AppointmentVariables.forEach((value) => {
                this[value] = clone[value];
            });
        }
    }
}
