// 145, created app-routing-module.ts
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // 127
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
    // Home tab
    {path: '',component: HomeComponent}, 

    // Users tab
    {path: 'users',component: UsersComponent, children: [
        {path: ':id/:name',component: UserComponent}
    ]},
    
    // Servers tab
    {
        path:'servers', 
        canActivateChild:[AuthGuard], 
        component: ServersComponent, 
        children: 
            [
                // 152 added resolve...
                {
                    path: ':id',
                    component: ServerComponent, 
                    resolve: {
                        server: ServerResolver
                    }
                },
                {
                    path: ':id/edit',
                    component: EditServerComponent, 
                    canDeactivate: [CanDeactivateGuard]
                } 
            ]
    },

    // not found
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'This is a "page not found" message hard-coded into the route at app-routing-module.ts'}},

    // global
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: false})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}