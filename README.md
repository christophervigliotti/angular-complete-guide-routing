# Section 11 - Changing Pages With Routing

This is one of several repos that I created for the course "Angular - The Complete Guide (2022 Edition)". [Click here for a complete list of repos created for this course](https://gist.github.com/christophervigliotti/92e5b3b93cbe9d630d8e9d81b7eb6636).

## Chapters

```
124. Module Introduction 

125. Why do we need a Router? 

126. Understanding the Example Project 

In our app, we got three sections:

    1. Home
    2. Servers
        2.a View and Edit Servers
        2.b A Service is used to load and update Servers
    3. Users
        3.a View Users

This app will be improved by adding routing but definitely feel free to play around with it - besides routing, everything should be working fine.

127. Setting up and Loading Routes 

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
    // aka localhost:4200/users
    { 
        path: 'servers',
        component: ServersComponent 
    }
    ];

// ...also...

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) // 127
  ],

<!-- 127 in app.component.html...added the router-outlet (the area that will load the page/component associated with the route)-->

  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>

<!-- 
bad bootstrap css was bugging me 
https://getbootstrap.com/docs/4.0/components/navs/#tabs
-->
    <ul class="nav nav-tabs">
    <li role="presentation" class="nav-item">
        <a href="#" class="nav-link active">Home</a></li>
    <li role="presentation" class="nav-item">
        <a href="#" class="nav-link">Servers</a></li>
    <li role="presentation" class="nav-item">
        <a href="#" class="nav-link">Users</a></li>
    </ul>

128. Navigating with Router Links

<!--
128 router links
-->
    <ul class="nav nav-tabs">
    <li role="presentation" class="nav-item">
        <a 
        routerLink="/" 
        class="nav-link active">Home</a></li>
    <li role="presentation" class="nav-item">
        <a 
        routerLink="/servers" 
        class="nav-link">Servers</a></li>
    <li role="presentation" class="nav-item">

        <!-- 128 router link, property binding with non-string elements -->
        <a 
        [routerLink]="['/users']" 
        class="nav-link">Users</a></li>
    </ul>

129. Understanding Navigation Paths

<!-- 
    129 added link to servers.component.html...
    routerLink attribute does not have the leading slash (produces an error because there is no route "/servers/servers" )...
    <a routerLink="servers">Reload Page</a>
    
    ...adding the slash fixes the problem...
-->
    <a routerLink="/servers">Reload Page</a>

130. Styling Active Router Links

<!-- 
130 added routerLinkActive and (to home page) routerLinkActiveOptions

question: how can I make this conditional...meaning...still apply the 'nav-link'
posted my q over at: https://stackoverflow.com/questions/71859165/how-to-apply-a-css-class-to-a-link-when-its-route-is-not-active
-->
    <ul class="nav nav-tabs">
    <li role="presentation" class="nav-item">
        <a 
        [routerLinkActive]="['nav-link','active']" 
        [routerLinkActiveOptions]="{exact: true}"
        routerLink="/" 
        >Home</a>
    </li>
    <li role="presentation" class="nav-item">
        <a 
        routerLink="/servers" 
        [routerLinkActive]="['nav-link','active']" 
        >Servers</a>
    </li>
    <li role="presentation" class="nav-item">
        <a 
        [routerLink]="['/users']" 
        [routerLinkActive]="['nav-link','active']" 
        >Users</a>
    </li>
    </ul>

131. Navigating Programmatically

// home.component.ts
    export class HomeComponent implements OnInit {

    constructor(
        // 131 added this arg so that we can use it in method onLoadServers()
        private router: Router
    ) { }

    ngOnInit() {
    }

    // 131 added method + router.navigate()
    onLoadServers(){
        this.router.navigate(['/servers']); 
    }

    }


132. Using Relative Paths in Programmatic Navigation

<!-- 132 servers.component.html, added a new button with a click listener that fires method onReload()-->
    <button 
      class="btn btn-primary" 
      (click)="onReload()"
    >Reload Page</button>

// servers.component.ts...

  /* 
  131 servers.component.ts, added arguments (and object properties) router and route (for use in function onReload()).
  * Argument "router" is of type @angular/router/Router and gives us access to the navigate() method.
  * Argument "route" is of type @angular/router/ActivatedRoute and gives a means to pass in a relative path to the 2nd arg of our call to this.router.navigate().
  
  */
  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // 132 servers.component.ts, added method that is called by click listener
  onReload(){
    // this.router.navigate(['/servers'],{relativeTo: this.route});
  }

133. Passing Parameters to Routes

// 133 app.module.ts added this route with a dynamic placeholder named "id"
  { 
    path: 'users/:id',
    component: UsersComponent 
  },

134. Fetching Route Parameters

// user.component.ts
    // 134 user.component.ts, injected the activated route here in order to access path data (specifically in this case the user id)
    constructor(
        private route: ActivatedRoute 
    ) { }

    // 134 user.component.ts, using route to get the param value for ID
    ngOnInit() {
        console.log('user.component ngOnInit > "id" is "' + this.route.snapshot.params['id'] + '"');
        this.user = {
        id: this.route.snapshot.params['id'],
        name: this.route.snapshot.params['name']
        }
    }

<!-- 134 user.component.html, added variable output via {{string interpolation}} -->
    <p>User with ID {{user.id}} loaded.</p>
    <p>User name is {{user.name}}.</p>    

Outcome: http://localhost:4200/users/1/Vig displays the id of "1" and the user name of "Vig" as expected.

135. Fetching Route Parameters Reactively

<!-- 135 user.component.html, a router link to user 10 (Anna) -->
    <a
        [routerLink]="['/users',10,'Anna']"
    >
        Load Anna
    </a>

// 135, user.component.ts... 
    ngOnInit() {
        console.log('user.component ngOnInit > "id" is "' + this.route.snapshot.params['id'] + '"');
        this.user = {
        id: this.route.snapshot.params['id'],
        name: this.route.snapshot.params['name']
        }
        // 135, user.component.ts, added the params 'observable' 
        // an observable is a feature added by a 3rd party package that allow you to work with async tasks
        this.route.params.subscribe(
        // the subscribe method here takes three args...
        // arg.1. - a function that will be fired when new data is sent through the observable
        (params: Params) => {
            // this will update the user property when the params change
            this.user.id = params['id'];
            this.user.name = params['name'];
        }
        // arg.2. - tbd
        // arg.3. - tbd
        );
    }

136. An Important Note about Route Observables

// user.component.ts...
    paramsSubscription: Subscription; // 136 added subscription as a property...

    // 136 ...and added a call to unsubscribe in ngOnDestroy
    // note that this happens automatically thx to angular
    // but if you add your own observables you have to unsubscribe on your own
    ngOnDestroy(){
        this.paramsSubscription.unsubscribe();
    }

137. Passing Query Parameters and Fragments

// 137 route added app.module.ts
    {
        path: 'servers/:id/edit',
        component: EditServerComponent
    }

<!-- 
137, servers.component.html, added 
* routerLink 
* queryParams 
* fragment 
-->
    <a
    [routerLink]="['/servers',5,'edit']"
    [queryParams]="{allowEdit:'1'}"
    [fragment]="'loading'"
    href="#"
    class="list-group-item"
    *ngFor="let server of servers">
    {{ server.name }}
    </a>

<!-- 137, home.component.html, changed click event from onLoadServers() to onLoadServer(1) -->
    <button 
        class="btn btn-primary" 
        (click)="onLoadServer(1)"
    >Load Servers</button>

// 137, home.component.ts, added method onLoadServer
onLoadServer(id: number){
    // navigate() function call...
    this.router.navigate(
        // passing in the id...
        ['/servers',id,'edit'],
        // passing in query param 'allowEdit' with a value of '1'...
        {queryParams: {allowEdit: '1'}, 
        // passing in the fragment '#loading'...
        fragment: 'loading'}
    ); 
}

138. Retrieving Query Parameters and Fragments

// edit-server.component.ts...
    constructor(
        private serversService: ServersService,
        // 138 injecting the ActivatedRoute (for use in ngOnInit)
        private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    ...

139. Practicing and some Common Gotchas

<!-- 139, users.component.html, added [routerLink]-->
    <a
        [routerLink]="['/users',user.id, user.name]"
        href="#"
        class="list-group-item"
        *ngFor="let user of users">
        {{ user.name }}
    </a>

<!-- 139, servers.component.html, modified [routerLink]-->
    <a
        [routerLink]="['/servers',server.id]"
        [queryParams]="{allowEdit:'1'}"
        [fragment]="'loading'"
        href="#"
        class="list-group-item"
        *ngFor="let server of servers">
        {{ server.name }}
    </a>

// 139, app.module.ts, added this route
    {path: 'servers/:id',component: ServerComponent},

// 139, server.component.ts, injected ActivatedRoute via the constructor
    constructor(
        private serversService: ServersService,
        private route: ActivatedRoute 
    ){ 

    }

    // ...and in the same file...

    ngOnInit() {
        // 139, set this const equal to the param, and added + which converts params['id'] to a number
        const id = +this.route.snapshot.params['id']; 

        this.server = this.serversService.getServer(1);

        // 139 added this subscribe method...get a new server when the id changes
        this.route.params.subscribe(
            (params: Params) => {
                this.server = this.serversService.getServer(+params['id']);
            }
        );
    }
// 139, user.component.ts, removing the unsubscribe method made things work properly
  ngOnDestroy(){
    // this.paramsSubscription.unsubscribe();
  }

140. Setting up Child (Nested) Routes

Refactored the routes defined in app.module.ts, defining several child routes...

    {path: '',component: HomeComponent}, 
    {path: 'users',component: UsersComponent, children: [
        {path: ':id/:name',component: UserComponent}
    ]},
    {path:'servers',component: ServersComponent, children: [
        {path: ':id',component: ServerComponent},
        {path: ':id/edit',component: EditServerComponent} 
    ]},

Added router-outlet to users.component.html & servers.component.html.
    This adds a new hook which will be used on all child routes of the servers (or users) component
    Allows us to load nested/child routes.
    It's magic.

    <router-outlet></router-outlet>

141. Using Query Parameters - Practice

Added a button to server.component.html w a click listener calling onEdit()...

    <button
        class="btn btn-primary" 
        (click)="onEdit()"
    >Edit Server</button>

In server.component.ts...

    // injecting router for use in onEdit()...
    constructor(
        private serversService: ServersService,
        private route: ActivatedRoute, 
        private router: Router // < this is new
    ){ 
    }

    // method called by cooresponding .html file...
    onEdit(){
        this.router.navigate(['edit'],{relativeTo: this.route}); 
        // ^ navigates to relative path 'edit'
    }   

servers.component.html...

        <!-- 
        141, servers.component.html, added an elvis operator that 
        only sets the allowEdit query param to 1 if the server id is 3 
        -->
        <a
            [routerLink]="['/servers',server.id]"
            [queryParams]="{allowEdit:server.id === 3 ? '1' : '0'}" 
            [fragment]="'loading'"
            href="#"
            class="list-group-item"
            *ngFor="let server of servers">
            {{ server.name }}
        </a>  

edit-server.component.ts...

    we want to be able to retrieve our query params...

    // 141 setting property this.allowEdit based on the value of the query param allowEdit
    this.route.queryParams.subscribe(
        (queryParams: Params) => {
            this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
    );    

<!-- edit-server.component.html, conditional view/edit display logic added -->

    <h4 *ngIf="!allowEdit">You Shall Not Pass (or edit this Server)</h4>
    <div *ngIf="allowEdit">   
        ...code continues...

doesn't work (doesn't preserve relevant query param(s) when clicking 'Edit Server' button)

    will fix in 142

142. Configuring the Handling of Query Parameters

/* 
142, server.component.ts, added a third element to the 
second argument in navigate() called "queryParamsHandling" 
that...lets us handle query params (naturally lol).  In this 
example we are preserving or maintaining our query params 
when navigating to 'edit'.  Makes sense!
*/ 
    onEdit(){
        this.router.navigate(
            ['edit'],
            {
                relativeTo: this.route, 
                queryParamsHandling: 'preserve'
            }
        ); 
    }

143. Redirecting and Wildcard Routes

ng g c page-not-found

// 143, app-module.ts, added routes
    {path: 'not-found', component: PageNotFoundComponent},
    {path: 'something', redirectTo: '/not-found'}

    192.168.1.77:4200/something/ now redirects to 
    192.168.1.77:4200/not-found/

    ...changed to...
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
    making sure that the ** redirect is at the end of the routes

    with this now all undefined routes redirect to not-found!

144. Important: Redirection Path Matching

    Important: Redirection Path Matching
    In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always the case when adding redirections.

    By default, Angular matches paths by prefix. That means, that the following route will match both /recipes  and just / 

    { path: '', redirectTo: '/somewhere-else' } 

    Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

    Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").

    To fix this behavior, you need to change the matching strategy to "full" :

    { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } 

    Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).

145. Outsourcing the Route Configuration 

// 145, app.module.ts, moved appRoutes constant to app-routing-module.ts

    /* also, in "imports", 
        (a) removed RouterModule.forRoot(appRoutes)
        (b) added AppRoutingModule 
    */
    imports: [
        BrowserModule,
        FormsModule,
        // RouterModule.forRoot(appRoutes),
        AppRoutingModule
    ],

// created app-routing-module.ts

    import { EditServerComponent } from './servers/edit-server/edit-server.component';
    import { HomeComponent } from './home/home.component';
    import { NgModule } from '@angular/core';
    import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // 127
    import { ServerComponent } from './servers/server/server.component';
    import { ServersComponent } from './servers/servers.component';
    import { Routes, RouterModule } from '@angular/router';
    import { UserComponent } from './users/user/user.component';
    import { UsersComponent } from './users/users.component';

    const appRoutes: Routes = [
        {path: '',component: HomeComponent}, 
        {path: 'users',component: UsersComponent, children: [
            {path: ':id/:name',component: UserComponent}
        ]},
        {path:'servers',component: ServersComponent, children: [
            {path: ':id',component: ServerComponent},
            {path: ':id/edit',component: EditServerComponent} 
        ]},
        {path: 'not-found', component: PageNotFoundComponent},
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

146. An Introduction to Guards

    code which is executed 
        a. when a route is loaded, or 
        b. when you want to leave a route  

147. Protecting Routes with canActivate

    auth-guard.service.ts 

        created

        extends CanActivate
            this forces you to have a canActivate() method

        canActivate() method

            args
                ActivatedRouteSnapshot
                RouterStateSnapshot

            returns one of
                Observable, Promise or boolean

            logic flow
                return logic flow...
                    1. the result of the isAuthenticated() method
                    2. passes the boolean from #1 to chained method .then() 
                    3. returns true if authenticated, otherwise navigates to '/'

        @Injectable()
            required so that we can inject another service into this service
            in this case we are injecting authService (for use in canActivate())

    auth.service.ts
        created
        loggedIn property
        methods for logging in, logging out 
        method isAuthenticated

    how we implement this fanciness

        app-routing-module.ts, routes array, 'servers'...

            {path:'servers', canActivate:[AuthGuard], component: ServersComponent, children: [
                {path: ':id',component: ServerComponent},
                {path: ':id/edit',component: EditServerComponent} 
            ]},

            in this example the guard(s) are applied to child routes as well as the parent route

    works great!

148. Protecting Child (Nested) Routes with canActivateChild

    auth-guard-service...

        added method canActivateChild() 

        canActivateChild
            (
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
            ):
            Observable<boolean> | Promise<boolean> | boolean {
                return this.canActivate(route, state);
            }

        this method fires for all routes that are children of the specified route(s) 
            (specified in this case in app-routing-module.ts)

    modified the 'servers' route in app-routing-module.ts...

        ...
        {
            path:'servers', 
            //  we no longer need this canActivate:[AuthGuard], 
            canActivateChild:[AuthGuard], // this was added
            component: ServersComponent, 
            children: 
                [
                    {path: ':id',component: ServerComponent},
                    {path: ':id/edit',component: EditServerComponent} 
                ]
        },
        ...      

149. Using a Fake Auth Service

    home.component.html gets two buttons...
    <button class="btn btn-default" (click)="onLogin()">Login</button>
    <button class="btn btn-default" (click)="onLogout()">Logout</button>

    ...and added the methods to home.component.ts...
    onLogin(){
        console.log('home.component onLogin');
        this.authService.login();
    }
    onLogout(){
        console.log('home.component onLogout');
        this.authService.logout();
    }
    ...and in the constructor...
    constructor(
        private router: Router, 
        private authService: AuthService // << don't forget to import AuthService
    ) { }

150. Controlling Navigation with canDeactivate

    edit-server.component.ts

        new property
            changesSaved = false;

        new property (via injection via the constructor)
            private router: Router 

        new logic added to onUpdateServer
            this.changesSaved = true;
            this.router.navigate(['../'],{relativeTo: this.route});
            can-deactivate.guard.service.ts

    created can-deactivate-guard.service.ts

        import { 
            ActivatedRouteSnapshot, 
            CanDeactivate, 
            RouterStateSnapshot, 
            UrlTree 
        } from "@angular/router";
        import { Observable } from "rxjs";

        export interface CanComponentDeactivate {
            canDeactivate: () => 
                // returns an Observable, a Promise or a boolean
                Observable<boolean> 
                | Promise<boolean> 
                | boolean;
        } 

        // ? why do an interface here (as opposed to just using a variation of the implementation code below) ?

        export 
            class CanDeactivateGuard 
            implements CanDeactivate<CanComponentDeactivate> {

            canDeactivate(
                component: CanComponentDeactivate, 
                currentRoute: ActivatedRouteSnapshot, 
                currentState: RouterStateSnapshot, 
                // returns an Observable, a Promise or a boolean
                nextState?: RouterStateSnapshot): 
                    // returns an Observable, a Promise or a boolean
                    Observable<boolean> 
                    | Promise<boolean> 
                    | boolean
                    {
                        return component.canDeactivate();
                    }
        }   

    app-routing.module.ts

        changed this route
            {
                path: ':id/edit',
                component: EditServerComponent
            } 
        to this
            {
                path: ':id/edit',
                component: EditServerComponent, 
                canDeactivate: [CanDeactivateGuard]
            } 

    app.module.ts

        added CanDeactivateGuard to providers array of @NgModule

    implement the interface in edit-server.component.ts @ 8:07

        canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
            if(!this.allowEdit){
                return true;
            }
            if(
                (this.serverName !== this.server.name || this.serverStatus !== this.server.status) 
                && !this.changesSaved
            ){
                return confirm('Do you want to discard the changes?');
            }else{
                return true;
            }
        }

    changed a few lines of code in edit-server.component.ts method ngOnInit...

        const id = +this.route.snapshot.params['id']; // << new
        this.server = this.serversService.getServer(id);
        // EXERCISE: subscribe route params to update the id if params change << TODO

150.5 edit-server.component.ts >> ngOnInit EXERCISE: subscribe route params to update the id if params change

    edit-server...

        this.route.params.subscribe(
            (params: Params) => {
            this.server = this.serversService.getServer(+params['id']);
            this.serverName = this.server.name;
            this.serverStatus = this.server.status;
            console.log('edit-server > ngOnInit params.subscribe id ' + params['id']);
            }
        )

151. Passing Static Data to a Route

    ng g c error-page

    changed a route in app-routing-module.ts
        // was...{path: 'not-found', component: PageNotFoundComponent},
        // ...is...
        {
            path: 'not-found', 
            component: ErrorPageComponent, 
            data: 
            {
                message: 'This is a "page not found" message hard-coded into the route at app-routing-module.ts'
            }
        },

        ...subscribe action happening in error-page.component.ts...
            ngOnInit(): void {
                /* we could grab the error message like this...
                this.errorMessage = this.route.snapshot.data['message'];
                ...but if this could possibly change while you are on the page we should subscribe... */
                this.route.data.subscribe(
                    (data: Data) => {
                        this.errorMessage = data['message'];
                        console.log('error-page > ngOnInit data...');
                        console.log(data);
                    }
                );
            }        

        and in error-page.component.html we display the message...
            <p>{{ errorMessage }}</p>

152. Resolving Dynamic Data with the resolve Guard

    server-resolver.service.ts
        notes

    app.module.ts
        notes

    app-routing.module.ts
        added resolve

    server.component.ts
        commented out stuff

    app-routing.module.ts


153. Understanding Location Strategies

154. Wrap Up
```

## Percent Complete

At this end of this section I am __% complete with this course.

# More Info

## Error When Running `npm i`

* posted over at https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656272#questions/17278720 
* details at https://gist.github.com/christophervigliotti/7827912e379376fe3fbbe81e190333c0 

### Solution!  

With help from https://github.com/spiraldev/ and https://gist.github.com/ted-piotrowski/33d7a23ce9f67231620d8edd825bf89e 

```
# uninstall the things
sudo apt-get remove nodejs
sudo apt-get remove npm
sudo rm /etc/apt/sources.list.d/*

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# close and reopen terminal now or...
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# verify installation
command -v nvm

# made a VM snapshot at this point

# next steps...
# https://dev.to/ms314006/how-to-install-npm-through-nvm-node-version-manager-5gif
# nvm use system ... no system version defined

nvm ls-remote
# revealed latest LTS: v16.14.2   (Latest LTS: Gallium)

nvm install v16.14.2

# check the version of nvm currently in use 
nvm current

# let's install this stuff...
ng i
# getting this...
# npm WARN old lockfile 
# npm WARN old lockfile The package-lock.json file was created with an old version of npm,
# npm WARN old lockfile so supplemental metadata must be fetched from the registry.
# npm WARN old lockfile 
# npm WARN old lockfile This is a one-time fix-up, please be patient...
# npm WARN old lockfile 

ng s
# we are gtg!
```