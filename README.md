### Installation
Make sure you have cloned and started [Developer Proxy](https://github.com/AdaloHQ/developer-proxy) before starting. 

Use your local credentials when asked while running the commands below. If you log into Adalo with another credential, you won't be able to see the new Development tab.

```sh
$ git clone https://github.com/AdaloHQ/cli.git && cd cli && yarn && yarn link & cd ..  
$ git clone https://github.com/AdaloHQ/material-components-library.git && cd material-components-library && yarn link @adalo/cli && yarn
$ npx adalo login --local
$ npx adalo dev --local
```
