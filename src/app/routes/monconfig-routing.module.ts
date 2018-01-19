import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**Import Config Components */
import { CavMonRightPaneComponent } from '../components/cav-mon-right-pane/cav-mon-right-pane.component';
import { ConfigurationHomeComponent } from '../components/cav-mon-mjson/configuration-home/configuration-home.component';
import { AdvanceSettingsComponent } from '../components/cav-mon-mjson/advance-settings/advance-settings.component';
// import { WeblogicConfigureComponent} from '../components/cav-mon-mjson/weblogic-configure/weblogic-configure.component';
// import { WeblogicCongigure2Component} from '../components/cav-mon-mjson/weblogic-congigure2/weblogic-congigure2.component';
import { ConfigureWeblogicComponent } from '../components/cav-mon-mjson/configure-weblogic/configure-weblogic.component';
import { ConfigureWeblogic2Component } from '../components/cav-mon-mjson/configure-weblogic2/configure-weblogic2.component';
import { ConfigurationMonitorsRoutingComponent } from '../components/cav-mon-mjson/configuration-monitors-routing/configuration-monitors-routing.component';
import { MonitorsComponent } from '../components/cav-mon-mjson/monitors/monitors.component';
import { TestComponent } from '../components/test/test.component';
 
/**For ProductUI */
// const routes: Routes = [
//     {
//         path: '', component: AppComponentForConfig, children: [
//             { path: '', redirectTo: 'home', pathMatch: 'full' },
//             { path: 'home', component: ConfigHomeComponent },
//             { path: 'application-list', component: ConfigApplicationListComponent },
//             { path: 'tree-main/:dcId', component: ConfigTreeMainComponent },
//             { path: 'tree-main/topology/:topoId', component: ConfigTreeMainComponent },
//             {
//                 path: 'profile', component: ConfigProfileRoutingComponent, children: [
//                     { path: '', redirectTo: 'profile-list', pathMatch: 'full' },
//                     { path: 'profile-list', component: ConfigProfileListComponent },
//                     { path: 'configuration/:profileId', component: ConfigurationComponent },
//                     { path: 'general/:profileId/:tabId', component: GeneralComponent },
//                     { path: 'advance/:profileId/:tabId', component: AdvanceComponent },
//                     { path: 'instrumentation/:profileId/:tabId', component: InstrumentationComponent },
//                     { path: 'integration/:profileId/:tabId', component: ProductIntegrationComponent }
//                 ]
//             },
//             { path: 'topology-list', component: ConfigTopologyListComponent },
//             { path: 'nd-agent', component: ConfigNdAgentComponent },
//         ]
//     }
// ];

/**For local setup */
const routes: Routes = [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: CavMonRightPaneComponent },
            { path: 'mjson', component: ConfigurationMonitorsRoutingComponent , children  :[
                 { path: '', redirectTo:'configuration/:mjsonName/:topoName', pathMatch: 'full' },
                 { path:'configuration/:mjsonName/:topoName', component: ConfigurationHomeComponent  },
                 { path:'weblogicSettings/:mjsonName/:topoName/:monName/:tierId/:tierName', component: ConfigureWeblogic2Component},
                 { path:'advanceSettings/:mjsonName/:topoName/:monName/:tierId/:tierName', component: MonitorsComponent}
             ]
            }
          ];

@NgModule({
    // imports: [RouterModule.forChild(routes)],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ConfigRoutingModule {

}
