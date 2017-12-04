import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**Import Config Components */
import { CavMonRightPaneComponent } from '../components/cav-mon-right-pane/cav-mon-right-pane.component';
import { ConfigurationHomeComponent } from '../components/cav-mon-mjson/configuration-home/configuration-home.component';
import { AdvanceSettingsComponent } from '../components/cav-mon-mjson/advance-settings/advance-settings.component';
import { WeblogicConfigureComponent} from '../components/cav-mon-mjson/weblogic-configure/weblogic-configure.component';

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
            { path: 'mjson/:mjsonName/:topoName', component: ConfigurationHomeComponent },
            { path: 'advanceSettings/:monName/:tierfield', component: WeblogicConfigureComponent},
          ];

@NgModule({
    // imports: [RouterModule.forChild(routes)],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ConfigRoutingModule {

}
