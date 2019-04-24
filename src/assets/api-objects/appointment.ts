
// TODO: Repackage
import { ClientNotes } from './client-notes';

export class Appointment {
    AppointmentID: number;
    AuthorityID: number;
    PatientID: number;
    tfiSurvey: tfiSurvey;
    thsSurvey: thsSurvey;
    tsSurvey: tsSurvey;
    AudiologistExams: AudiologistExams;
    AppointmentDate: string;
    AppointmentTime: string;
    PatientNotes: string;
    AppoitnemtnsNotes: string;

}

export class tfiSurvey {
    public tfiSurveyID: number;
    public PatientID: number;
    public CompletionDate: string;
    public CompletionTime: string;
    public TFI_I: number;
    public TFI_Sc: number;
    public TFI_C: number;
    public TFI_SI: number;
    public TFI_A: number;
    public TFI_R: number;
    public TFI_Q: number;
    public TFI_E: number;
    public TFI_OverallScore: number;
};

export class thsSurvey {
    public thsSurveyID: number;
    public PatientID: number;
    public CompletionDate: string;
    public CompletionTime: string;
    public THS_SectionA: number;
    public THS_SectionB: number;
    public THS_SectionC: string;
}

export class tsSurvey {
    public tsSurveyID: number;
    public PatientID: number;
    public CompletionDate: string;
    public CompletionTime: string;
    public TS_Type: string;
}

export class Patient {
    public PatientID: number;
    public Deceased: boolean;
    public Notes: string;
}

export class AudiologistExams {
    public AudiologistExamsID: number;
    public TympanometryType: string;
    public OtoscopyType: string;
    public RightEar_LowF_Severity: string;
    public RightEar_HighF_Severity: string;
    public LeftEar_LowF_Severity: string;
    public LeftEar_HighF_Severity: string;
    public RightEar_LowF_Configuration: string;
    public RightEar_HighF_Configuration: string;
    public LeftEar_LowF_Configuration: string;
    public LeftEar_HighF_Configuration: string;
    public AudiogramType: string;
}
