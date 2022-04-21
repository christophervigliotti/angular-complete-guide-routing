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
import { Routes, RouterModule } from '@angular/router'; // 127

// 127 defining our routes in app.module.ts (they also need to be registered to the imports array)
const appRoutes: Routes = [
  // aka localhost:4200
  { 
    path: '',
    component: HomeComponent 
  },
  // aka localhost:4200/users
  { 
    path: 'users',
    component: UsersComponent 
  },
  // 133 app.module.ts added this route with a dynamic placeholders named "id" and "name"
  { 
    path: 'users/:id/:name',
    component: UsersComponent 
  },
  // aka localhost:4200/users
  { 
    path: 'servers',
    component: ServersComponent 
  },
  // 137 route added app.module.ts
  {
    path: 'servers/:id/edit',
    component: EditServerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) // 127
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
