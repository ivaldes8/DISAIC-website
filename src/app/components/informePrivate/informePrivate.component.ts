import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../services/informe.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as AOS from 'aos';

@Component({
  selector: 'app-informePrivate',
  templateUrl: './informePrivate.component.html',
  styleUrls: ['./informePrivate.component.css']
})
export class InformePrivateComponent implements OnInit {

  fetching = false;
  noData = false;

  startList;
  profile;

  url = "getPublicProducts";

  imgUrl = environment.API_DISAIC_IMG_URL;
  pdfUrl = environment.API_DISAIC_PDF_URL;

  constructor(private toast: ToastrService,
    private informeService: InformeService,
    private userService: UserService) { }

  async ngOnInit(){
    AOS.init();
    this.profile = await this.userService.getProfile().toPromise();
    this.startList = await this.informeService.getPrivateProductsByUser(this.profile.id).toPromise();
  }
  getProfile(){
    this.userService.getProfile().subscribe(data => {
      Object.assign(this.profile, data);
      console.log(this.profile,'PROFILE')
    }, error => {
      console.log("Informes ", error);
      this.toast.error("Error while getting Informes data")
    });
  }

}
