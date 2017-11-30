import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CavMonHomeComponent } from './components/cav-mon-home/cav-mon-home.component';
import { CavMonHeaderTopNavBarComponent } from './components/cav-mon-header-top-nav-bar/cav-mon-header-top-nav-bar.component';
// import { CavMonMenuComponent } from './components/cav-mon-menu/cav-mon-menu.component';
import { CavMonLeftSideBarComponent } from './components/cav-mon-left-side-bar/cav-mon-left-side-bar.component';

//Added for Preventing 404 error while reloading
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

/**Import materiapl module */
import { MaterialModule } from '@angular/material';


/**Importing services  ****/
import { ConfigRestApiService } from './services/config-rest-api.service';
import { ConfigUtilityService } from './services/config-utility.service';
import { CavmonHomeService } from './services/cavmon-home.service';
import { CavmonConfigService } from './services/cavmon-config.service';

/** Routing Module */
import { ConfigRoutingModule } from './routes/monconfig-routing.module';

import { CommonModule } from '@angular/common';




/**Import ngprime module ****/
import {TooltipModule,
        BreadcrumbModule,
        FieldsetModule,
        DropdownModule,
        PanelModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        TreeTableModule,
        TreeNode,
        SharedModule,
        TriStateCheckboxModule,
        CheckboxModule,
        ToolbarModule
    } from 'primeng/primeng';

import { CavMonTopNavBarComponent } from './components/cav-mon-top-nav-bar/cav-mon-top-nav-bar.component';
import { CavMonBreadcrumbComponent } from './components/cav-mon-breadcrumb/cav-mon-breadcrumb.component';
import { CavMonRightPaneComponent } from './components/cav-mon-right-pane/cav-mon-right-pane.component';
import { CavMonHomeRightPaneComponent } from './components/cav-mon-home-right-pane/cav-mon-home-right-pane.component';
import { ConfigurationHomeComponent } from './components/cav-mon-mjson/configuration-home/configuration-home.component';


@NgModule({
  declarations: [
    AppComponent,
    CavMonHomeComponent,
    CavMonHeaderTopNavBarComponent,
    CavMonLeftSideBarComponent,
    CavMonTopNavBarComponent,
    CavMonBreadcrumbComponent,
    CavMonRightPaneComponent,
    CavMonHomeRightPaneComponent,
    ConfigurationHomeComponent,
    // CavMonMenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    TooltipModule,
    BreadcrumbModule,
    FieldsetModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    PanelModule,
    DataTableModule,
    ButtonModule,
    HttpModule,
    DialogModule,
    ConfigRoutingModule,
    TreeTableModule,
    TriStateCheckboxModule,
    CheckboxModule,
    ToolbarModule
  ],
  providers: [CavmonHomeService,ConfigRestApiService,ConfigUtilityService,CavmonConfigService
,  { provide: LocationStrategy, useClass: HashLocationStrategy},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
