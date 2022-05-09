import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // 127
import { AppRoutingModule } from './app-routing-module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

// 127 defining our routes in app.module.ts (they also need to be registered to the imports array)
// 140, refactored to define child routes
// 145, app.module.ts, moved appRoutes constant to app-routing-module.ts
/*
const appRoutes: Routes = [
  p
    {path: '',component: HomeComponent}, 
    {path: 'users',component: UsersComponent, children: [
        {path: ':id/:name',component: UserComponent}
    ]},
    {path:'servers',component: ServersComponent, children: [
        {path: ':id',component: ServerComponent},
        {path: ':id/edit',component: EditServerComponent} 
    ]},
    // 143, app-module.ts, added routes
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
];
*/
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    /* 145, removed RouterModule.forRoot(appRoutes)
    also added AppRoutingModule...
    */
   AppRoutingModule
  ],
  providers: [ServersService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
