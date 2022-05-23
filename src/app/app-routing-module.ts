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

const appRoutes: Routes = [
    {path: '',component: HomeComponent}, 
    {path: 'users',component: UsersComponent, children: [
        {path: ':id/:name',component: UserComponent}
    ]},
    {
        path:'servers', 
        //  148 commented this out canActivate:[AuthGuard], 
        canActivateChild:[AuthGuard], // 148, added
        component: ServersComponent, 
        children: 
            [
                {path: ':id',component: ServerComponent},
                /* 150 this code...
                {
                    path: ':id/edit',
                    component: EditServerComponent
                } 
                ...was changed to...*/
                {
                    path: ':id/edit',
                    component: EditServerComponent, 
                    canDeactivate: [CanDeactivateGuard]
                } 
                /* now Angular will NOTES_GO_HERE */
            ]
    },

    //151, commented out not-found, created ErrorPage
    // {path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'This is a "page not found" message hard-coded into the route at app-routing-module.ts'}},

    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}