# Section 11 - Changing Pages With Routing

This is one of several repos that I created for the course "Angular - The Complete Guide (2022 Edition)". For a complete list of repos created for this course: https://gist.github.com/christophervigliotti/92e5b3b93cbe9d630d8e9d81b7eb6636 .

## Chapters

```
✅ 124. Module Introduction 

✅ 125. Why do we need a Router? 

✅ 126. Understanding the Example Project 

In our app, we got three sections:

    1. Home
    2. Servers
        2.a View and Edit Servers
        2.b A Service is used to load and update Servers
    3. Users
        3.a View Users

This app will be improved by adding routing but definitely feel free to play around with it - besides routing, everything should be working fine.

✅ 127. Setting up and Loading Routes 

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

✅ 128. Navigating with Router Links

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

✅ 129. Understanding Navigation Paths

<!-- 
    129 added link to servers.component.html...
    routerLink attribute does not have the leading slash (produces an error because there is no route "/servers/servers" )...
    <a routerLink="servers">Reload Page</a>
    
    ...adding the slash fixes the problem...
-->
    <a routerLink="/servers">Reload Page</a>

✅ 130. Styling Active Router Links

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

✅ 131. Navigating Programmatically

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

✅ 133. Passing Parameters to Routes

// 133 app.module.ts added this route with a dynamic placeholder named "id"
  { 
    path: 'users/:id',
    component: UsersComponent 
  },

✅ 134. Fetching Route Parameters

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

✅ 135. Fetching Route Parameters Reactively

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

✅ 136. An Important Note about Route Observables

// user.component.ts...
    paramsSubscription: Subscription; // 136 added subscription as a property...

    // 136 ...and added a call to unsubscribe in ngOnDestroy
    // note that this happens automatically thx to angular
    // but if you add your own observables you have to unsubscribe on your own
    ngOnDestroy(){
        this.paramsSubscription.unsubscribe();
    }

🔜 137. Passing Query Parameters and Fragments

🔜 138. Retrieving Query Parameters and Fragments

🔜 139. Practicing and some Common Gotchas

🔜 140. Setting up Child (Nested) Routes

🔜 141. Using Query Parameters - Practice

🔜 142. Configuring the Handling of Query Parameters

🔜 143. Redirecting and Wildcard Routes

🔜 144. Important: Redirection Path Matching

🔜 145. Outsourcing the Route Configuration

🔜 146. An Introduction to Guards

🔜 147. Protecting Routes with canActivate

🔜 148. Protecting Child (Nested) Routes with canActivateChild

🔜 149. Using a Fake Auth Service

🔜 150. Controlling Navigation with canDeactivate

🔜 151. Passing Static Data to a Route

🔜 152. Resolving Dynamic Data with the resolve Guard

🔜 153. Understanding Location Strategies

🔜 154. Wrap Up
```

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