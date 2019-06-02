import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  public ngOnInit() {
  }

  public audioLoginClick() {
    this.router.navigateByUrl('/aud-login');
    console.log('button to go to audiologist login page');
  }
  public backOnClick(){
    this.router.navigateByUrl('/summary');
    console.log('button to go back to  summary page');
  }

  public pleasantActivitiesOnClick() {
    this.router.navigateByUrl('/pa');
    console.log('button to pleasant activities page');
  }

  public changingThoughtsOnClick() {
    this.router.navigateByUrl('/ct');
    console.log('button to changing thoughts page');
  }

  public mindfulnessOnClick() {
    this.router.navigateByUrl('/mindfulness');
    console.log('button to mindfulness page');
  }

  public guidedMeditationOnClick() {
    this.router.navigateByUrl('/gm');
    console.log('button to guided meditation page');
  }

  public relaxationOnClick() {
    this.router.navigateByUrl('/relaxation');
    console.log('button to relaxation page');
  }

  public betterSleepOnClick() {
    this.router.navigateByUrl('/sleep');
    console.log('button to better sleep page');
  }

  public usingSoundOnClick() {
    this.router.navigateByUrl('/sound');
    console.log('button to using sound page');
  }

  public faqOnClick() {
    this.router.navigateByUrl('/faq');
    console.log('button to faq page');
  }

}
