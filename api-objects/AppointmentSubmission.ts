export class AppointmentSubmission {
    constructor(clone?: AppointmentSubmission) {
        if (clone) {
            this.patient = clone.patient;
            this.patientSurvey = clone.patientSurvey;
        }
    }

    patientSurvey: PatientSurveyJSON;
    patient: PatientJSON;

    public exportToSQLVars() {
        return {
            patientid: this.patient.patientId, //TODO: Replace with actual patient id
            isDeceased: this.patient.isDeceased,
            otoscopytype: this.patientSurvey.otoscopytype,
            tympanometrytype: this.patientSurvey.tympanometrytype,

            rightear_lowf_severity: this.patientSurvey.rightEarLowFreqSeverity,
            rightear_lowf_configuration: this.patientSurvey.rightEarLowFreqConfiguration,
            rightear_highf_severity: this.patientSurvey.rightEarHighFreqSeverity,
            rightear_highf_configuration: this.patientSurvey.rightEarHighFreqConfiguration,

            leftear_lowf_severity: this.patientSurvey.leftEarLowFreqSeverity,
            leftear_lowf_configuration: this.patientSurvey.leftEarLowFreqConfiguration,
            leftear_highf_severity: this.patientSurvey.leftEarHighFreqSeverity,
            leftear_highf_configuration: this.patientSurvey.leftEarHighFreqConfiguration,

            audiogramtype: this.patientSurvey.audiogramtype,

            ths_sectiona: this.patientSurvey.thsSectionATotal,
            ths_sectionb: this.patientSurvey.thsSectionBTotal,
            ths_sectionc: this.patientSurvey.thsSectionCSeverity,
            ths_sectionc_example: this.patientSurvey.ths_sectionc_example, // TODO: FIND SECTION C EXAMPLE
            tfi_i: this.patientSurvey.tfiI,
            tfi_sc: this.patientSurvey.tfiSc,
            tfi_c: this.patientSurvey.tfiC,
            tfi_si: this.patientSurvey.tfiSi,
            tfi_a: this.patientSurvey.tfiA,
            tfi_r: this.patientSurvey.tfiR,
            tfi_q: this.patientSurvey.tfiQ,
            tfi_e: this.patientSurvey.tfiE,

            tfi_overallscore: this.patientSurvey.tfiOverallScore,

            ts_type: this.patientSurvey.tsTinnitusType
        };
    }
}

export class PatientJSON {
    patientId: string = '';
    isDeceased: boolean = false;
}

export class PatientSurveyJSON {
    otoscopytype: string = '';
    tympanometrytype: string = '';

    rightEarLowFreqSeverity: string = '';
    rightEarLowFreqConfiguration: string = '';
    rightEarHighFreqSeverity: string = '';
    rightEarHighFreqConfiguration: string = '';

    leftEarLowFreqSeverity: string = '';
    leftEarLowFreqConfiguration: string = '';
    leftEarHighFreqSeverity: string = '';
    leftEarHighFreqConfiguration: string = '';

    audiogramtype: string = '';

    thsSectionATotal: number = 0;
    thsSectionBTotal: number = 0;
    thsSectionCSeverity: number = 0;
    ths_sectionc_example: string = '';

    tfiI: number = 0;
    tfiSc: number = 0;
    tfiC: number = 0;
    tfiSi: number = 0;
    tfiA: number = 0;
    tfiR: number = 0;
    tfiQ: number = 0;
    tfiE: number = 0;

    tfiOverallScore: number = 0;

    tsTinnitusType: string = '';
}