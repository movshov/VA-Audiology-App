// tslint:disable-next-line:max-line-length
import { AudiologistNavigationComponent } from './audiologist-navigation/audiologist-navigation.component';
import { CheckInComponent } from './check-in/check-in.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';

import { DataResolver } from './app.resolver';
import { TsScreenerComponent } from './ts-screener/ts-screener.component';
import { TfiComponent } from './tfi/tfi.component';
import { ThsComponent } from './ths/ths.component';

import { RouterGuards } from './services/router-guards.service';
import { AudiologistLoginComponent } from './audiologist-login/audiologist-login.component';
import { LandingComponent } from './landing/landing.component';
import { PaComponent } from './pa/pa.component';
import { CtComponent } from './ct/ct.component';
import { MindfulnessComponent } from './mindfulness/mindfulness.component';
import { GmComponent } from './gm/gm.component';
import { RelaxationComponent } from './relaxation/relaxation.component';
import { SleepComponent } from './sleep/sleep.component';
import { SoundComponent } from './sound/sound.component';
import { FaqComponent } from './faq/faq.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';

// URL paths to redirect to and load components when appropriate
export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: CheckInComponent },
    { path: 'appointments', component: AppointmentsComponent, canActivate: [RouterGuards] },
    { path: 'audiologist', component: AudiologistNavigationComponent, canActivate: [RouterGuards] },
    { path: 'summary', component: PatientSummaryComponent, canActivate: [RouterGuards] },
    { path: 'ts', component: TsScreenerComponent, canActivate: [RouterGuards] },
    { path: 'tfi', component: TfiComponent, canActivate: [RouterGuards] },
    { path: 'ths', component: ThsComponent, canActivate: [RouterGuards] },
    { path: 'aud-login', component: AudiologistLoginComponent, canActivate: [RouterGuards] },
    { path: 'landing', component: LandingComponent, canActivate: [RouterGuards] },
    { path: 'pa', component: PaComponent, canActivate: [RouterGuards] },
    { path: 'ct', component: CtComponent, canActivate: [RouterGuards] },
    { path: 'mindfulness', component: MindfulnessComponent, canActivate: [RouterGuards] },
    { path: 'gm', component: GmComponent, canActivate: [RouterGuards] },
    { path: 'relaxation', component: RelaxationComponent, canActivate: [RouterGuards] },
    { path: 'sleep', component: SleepComponent, canActivate: [RouterGuards] },
    { path: 'sound', component: SoundComponent, canActivate: [RouterGuards] },
    { path: 'faq', component: FaqComponent, canActivate: [RouterGuards] },
    { path: 'patient-login', component: PatientLoginComponent, canActivate: [RouterGuards] },
    { path: '**', component: NoContentComponent },
];
