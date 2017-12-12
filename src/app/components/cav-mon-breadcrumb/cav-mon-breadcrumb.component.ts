import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import * as BREADCRUMB from '../../constants/monconfig-breadcrumb-constant';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cav-mon-breadcrumb',
  templateUrl: './cav-mon-breadcrumb.component.html',
  styleUrls: ['./cav-mon-breadcrumb.component.css']
})
export class CavMonBreadcrumbComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  breadcrumbSubscription: Subscription;
  constructor(private router: Router) { }

  ngOnInit() 
  {
     this.items = [{ routerLink: [BREADCRUMB.URL.HOME], label: BREADCRUMB.LABEL.HOME }];
     this.breadcrumbSubscription = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.items = [{ routerLink: [BREADCRUMB.URL.HOME], label: BREADCRUMB.LABEL.HOME }];

      let url = event["url"];
      console.log("ConfigBreadcrumbComponent", "ngOnInit", "url ", url);
      if (url.startsWith(BREADCRUMB.URL.CONFIGURATION)) 
      {
        this.items.push({ label: BREADCRUMB.LABEL.CONFIGURATION , routerLink: [BREADCRUMB.URL.CONFIGURATION]});
      }
      
      else if (url.startsWith(BREADCRUMB.URL.WEBLOGIC_CONFIGURATION)) 
      {
        let arrURL = url.split("/");
        
        let tabId = arrURL[arrURL.length - 1];
        console.log("tabId ================ ",tabId)
        let profileId = arrURL[arrURL.length - 2];
        console.log("ProfileId ================ ",tabId)
        
        this.items.push({ routerLink: [`${BREADCRUMB.URL.CONFIGURATION}/${profileId}/${tabId}`], label: BREADCRUMB.LABEL.CONFIGURATION });
        this.items.push({ label: BREADCRUMB.LABEL.WEBLOGIC_CONFIGURATION });
      }

     this.home = {icon: 'fa fa-home'};
  });
}
  ngOnDestroy() {
   
    if (this.breadcrumbSubscription)
      this.breadcrumbSubscription.unsubscribe();
  }
}
