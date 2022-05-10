export class AuthService {
    loggedIn = false;

    isAuthenticated(){
        const promise = new Promise(
            (resolve, reject) => {
                resolve(this.loggedIn); // resolve the promise
                /*
                the instructor had us add setTimeout() to simulate a round trip to the server lol
                setTimeout(() => { 
                    resolve(this.loggedIn);
                },
                800);
                */
            }
        );
        return promise;
    }

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }
}