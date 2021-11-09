import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ThemeService } from './services/theme.service';
import { AuthService } from './auth/auth.service';
import { SwUpdate } from '@angular/service-worker';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  customClass = '';
  toggleSidebar = false;
  searchText = '';
  url = 'productFullList';
  url2 = 'serviceFullList';
  url3 = 'trainingFullList';

  startList: [] = [];
  startList2: [] = [];
  startList3: [] = [];


  isAuthenticated = false;
  private userSub: Subscription;

  public config: PerfectScrollbarConfigInterface = {};
  firstBG: HTMLElement;
  secondBG: HTMLElement;
  constructor(private translate: TranslateService,
              private themeService: ThemeService,
              private authService: AuthService,
              private swUpdate: SwUpdate,
              private cardService: CardService,
    ){
     this.firstBG = document.getElementById('firstBG') as HTMLElement;
     this.secondBG = document.getElementById('secondBG') as HTMLElement;
    document.addEventListener('scroll', function() {
      const value = window.scrollY;
      firstBG.style.top = value * 1 + 'px';
      firstBG.style.right = value * 1 + 'px';

      secondBG.style.top = value * 0.25 + 'px';
      secondBG.style.right = value * 1.5 + 'px';

    });
    translate.setDefaultLang('es');
  }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if (confirm('New version available. Load New Version?')) {

              window.location.reload();
          }
      });
  }
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(
     user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
     }
   );

    this.fetchProducts();
    this.fetchServices();
    this.fetchEntrenamientos();
   // console.log(this.startList)
   // this.shoot();
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  // tslint:disable-next-line:typedef
  toggle(){
    this.toggleSidebar = !this.toggleSidebar;
    if (this.toggleSidebar){
      this.customClass = 'active';
    } else {
      this.customClass = '';
    }
  }

  // tslint:disable-next-line:typedef
  selectedLanguage(event: any){
    this.translate.use(event.target.value);
  }

  // tslint:disable-next-line:typedef
  selectTheme(event){
    if (event.target.text === 'Dark' || event.target.text === 'Oscuro'){
      this.themeService.setDarkTheme();
    }
    if (event.target.text === 'Blue' || event.target.text === 'Azul'){
      this.themeService.setBlueTheme();
    }
    if (event.target.text === 'Ligth' || event.target.text === 'Blanco'){
      this.themeService.setLightTheme();
    }
  }

  // tslint:disable-next-line:typedef
  onLogout(){
    this.authService.logout();
  }

  // tslint:disable-next-line:typedef
  fetchProducts(){
    this.cardService.getCards(this.url).subscribe(data => {
      Object.assign(this.startList, data);
      // console.log(data)
    }, error => {
      console.log('productoRoot', error);
    });
  }

  // tslint:disable-next-line:typedef
  fetchServices(){
    this.cardService.getCards(this.url2).subscribe(data => {
      Object.assign(this.startList2, data);
      // console.log(data)
    }, error => {
      console.log('servicioRoot', error);
    });
  }

  // tslint:disable-next-line:typedef
  fetchEntrenamientos(){
      this.cardService.getCards(this.url3).subscribe(data => {
        Object.assign(this.startList3, data);
        // console.log(data)
      }, error => {
        console.log('entrenamientoRoot', error);
      });
    }

  // tslint:disable-next-line:typedef
  // shoot() {
  //   try {
  //       this.confetti({
  //         angle: this.random(60, 120),
  //         spread: this.random(20, 60),
  //         particleCount: this.random(300, 400),
  //         origin: {
  //             y: 0.6
  //         }
  //     });
  //   } catch (e) {
  //       // noop, confettijs may not be loaded yet
  //   }
  // }

  // tslint:disable-next-line:typedef
  random(min: number, max: number) {
      return Math.random() * (max - min) + min;
  }

  // confetti(args: any) {
  //     return window.confetti.apply(this, arguments);
  // }
}
