# H1!

## Error When Running `npm -i`

* posted over at https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656272#questions/17278720 

### The Error Message

```
parallels@ubuntu-linux-20-04-desktop:~/Documents/Code/angular-complete-guide-routing$ sudo npm -i
[sudo] password for parallels: 
node:internal/modules/cjs/loader:933
  const err = new Error(message);
              ^

Error: Cannot find module 'code-point-at'
Require stack:
- /usr/lib/node_modules/npm/node_modules/wide-align/node_modules/string-width/index.js
- /usr/lib/node_modules/npm/node_modules/wide-align/align.js
- /usr/lib/node_modules/npm/node_modules/gauge/lib/render-template.js
- /usr/lib/node_modules/npm/node_modules/gauge/lib/plumbing.js
- /usr/lib/node_modules/npm/node_modules/gauge/lib/index.js
- /usr/lib/node_modules/npm/node_modules/npmlog/lib/log.js
- /usr/lib/node_modules/npm/lib/utils/log-shim.js
- /usr/lib/node_modules/npm/lib/utils/exit-handler.js
- /usr/lib/node_modules/npm/lib/cli.js
- /usr/lib/node_modules/npm/bin/npm-cli.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/usr/lib/node_modules/npm/node_modules/wide-align/node_modules/string-width/index.js:3:19)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/usr/lib/node_modules/npm/node_modules/wide-align/node_modules/string-width/index.js',
    '/usr/lib/node_modules/npm/node_modules/wide-align/align.js',
    '/usr/lib/node_modules/npm/node_modules/gauge/lib/render-template.js',
    '/usr/lib/node_modules/npm/node_modules/gauge/lib/plumbing.js',
    '/usr/lib/node_modules/npm/node_modules/gauge/lib/index.js',
    '/usr/lib/node_modules/npm/node_modules/npmlog/lib/log.js',
    '/usr/lib/node_modules/npm/lib/utils/log-shim.js',
    '/usr/lib/node_modules/npm/lib/utils/exit-handler.js',
    '/usr/lib/node_modules/npm/lib/cli.js',
    '/usr/lib/node_modules/npm/bin/npm-cli.js'
  ]
}
```