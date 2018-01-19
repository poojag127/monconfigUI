import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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


/**Reducer */
import { MonitorReducer } from './reducers/monitor-reducer';
import { MonitorCompReducer } from './reducers/monitor-comp-reducer';
import { ConfiguredMonDataReducer} from './reducers/configuredMonData-reducer';


/**Importing services  ****/
import { ConfigRestApiService } from './services/config-rest-api.service';
import { ConfigUtilityService } from './services/config-utility.service';
import { CavmonHomeService } from './services/cavmon-home.service';
import { CavmonConfigService } from './services/cavmon-config.service';
import { CavmonMonitorsdataService} from './services/cavmon-monitorsdata.service';
import { ConfirmationService} from 'primeng/primeng';

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
        ToolbarModule,
        TabViewModule,
        GrowlModule,
        SpinnerModule,
        RadioButtonModule,
        AccordionModule
        
    } from 'primeng/primeng';

import { ConfigurationMonitorsRoutingComponent } from './components/cav-mon-mjson/configuration-monitors-routing/configuration-monitors-routing.component';
import { CavMonTopNavBarComponent } from './components/cav-mon-top-nav-bar/cav-mon-top-nav-bar.component';
import { CavMonBreadcrumbComponent } from './components/cav-mon-breadcrumb/cav-mon-breadcrumb.component';
import { CavMonRightPaneComponent } from './components/cav-mon-right-pane/cav-mon-right-pane.component';
import { CavMonHomeRightPaneComponent } from './components/cav-mon-home-right-pane/cav-mon-home-right-pane.component';
import { ConfigurationHomeComponent } from './components/cav-mon-mjson/configuration-home/configuration-home.component';
import { AdvanceSettingsComponent } from './components/cav-mon-mjson/advance-settings/advance-settings.component';
import { WeblogicConfigureComponent } from './components/cav-mon-mjson/weblogic-configure/weblogic-configure.component';
import { WeblogicCongigure2Component } from './components/cav-mon-mjson/weblogic-congigure2/weblogic-congigure2.component';
import { ConfigureWeblogicComponent } from './components/cav-mon-mjson/configure-weblogic/configure-weblogic.component';
import { ConfigureWeblogic2Component } from './components/cav-mon-mjson/configure-weblogic2/configure-weblogic2.component';
import { MonitorsComponent } from './components/cav-mon-mjson/monitors/monitors.component';
import { DependentCompComponent } from './components/cav-mon-mjson/dependent-comp/dependent-comp.component';
import { DynamicTableviewComponent } from './components/cav-mon-mjson/dynamic-tableview/dynamic-tableview.component';
import { RenderCompComponent } from './components/cav-mon-mjson/render-comp/render-comp.component';
import { TestComponent } from './components/test/test.component';


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
    AdvanceSettingsComponent,
    WeblogicConfigureComponent,
    WeblogicCongigure2Component,
    ConfigureWeblogicComponent,
    ConfigureWeblogic2Component,
    ConfigurationMonitorsRoutingComponent,
    MonitorsComponent,
    DependentCompComponent,
    DynamicTableviewComponent,
    RenderCompComponent,
    TestComponent
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
    ToolbarModule,
    TabViewModule,
    SpinnerModule,
    RadioButtonModule,
    AccordionModule,
    GrowlModule,
    StoreModule.provideStore({ monitorData: MonitorReducer ,selectedMon:MonitorCompReducer,configuredData:ConfiguredMonDataReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
   
  ],
  providers: [CavmonHomeService,ConfigRestApiService,ConfigUtilityService,CavmonConfigService,CavmonMonitorsdataService,ConfirmationService
,  { provide: LocationStrategy, useClass: HashLocationStrategy},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
