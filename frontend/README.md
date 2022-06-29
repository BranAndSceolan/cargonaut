# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
- nur zum lokalen testen ohne datenbank und server
```
npm run serve
```

### Compiles and minifies for production
- use for building and start the docker afterwards
```
npm run build
```

### IN CASE OF PROBLEMS
-> version to new
```
npm --legacy-peer-deps install
```
-> vue cli not installed
```
npm install -g @vue/cli
```
-> eslint not found
```
vue add eslint                    
```
-> bootstrap missing
- use babel/polyfill: yes
- use scss: no
```
vue add bootstrap-vue
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
