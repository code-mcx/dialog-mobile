# mcx-dialog-mobile

<p>
  <a href="https://github.com/code-mcx/mcx-dialog-mobile"><img src="https://img.shields.io/badge/language-javascript-green.svg" alt="mcx-dialog-mobile"></a>
  <a href="https://github.com/code-mcx/mcx-dialog-mobile"><img src="https://img.shields.io/badge/npm-v0.2.0-blue.svg" alt="mcx-dialog-mobile"></a>
</p>
<p>
  <a href="https://github.com/code-mcx/mcx-dialog-mobile/blob/master/README_zh.md">中文文档</a>
</p>

# Description

This dialog is implemented with primary javascript. It is used to the mobile web terminal, and it can
be use with vue, react.

# Getting started

## Browser

First lead into css and js, they are in dist directory. You can't move any things under the dist directory.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="stylesheet" type="text/css" href="dist/css/dialog-mobile.css"/>
  </head>
  <body>
    ...
    <script type="text/javascript" src="dist/mcx-dialog.js"></script>
  </body>
</html>
```

Then you can get an object named `mcxDialog`.

```javascript
<script type="text/javascript">
  // Alert
  mcxDialog.alert("hi, I'm alert");

  // Confirm
  mcxDialog.confirm("hi, I'm confirm");

  // Toast
  mcxDialog.toast("hi，I'm toast");

  // Loading
  mcxDialog.loading({src: "dist/img"});

  // Bottom dialog
  mcxDialog.showBottom();
</script>
```
More use see the [index.html](https://github.com/code-mcx/mcx-dialog-mobile/blob/master/index.html).

## Npm

If you are useing npm, first install this package.

```
npm install mcx-dialog-mobile
```

Import dependency.

```javascript
// CommonJS
let McxDialog = require("mcx-dialog-mobile").default

// ES6
import McxDialog from "mcx-dialog-mobile"
```

### Vue

mcx-dialog provided better operations in Vue.

```javascript
import McxDialog from "mcx-dialog-mobile"
// Install as Vue's plugin
Vue.use(McxDialog)
```

In single page application, call it in any where.

```javascript
<template>
  <div id="app">
    <button @click="alert">alert</button>
    <button @click="confirm">confirm</button>
    <button @click="toast">toast</button>
    <button @click="loading">loading</button>
    <button @click="showBottom">bottom</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    alert() {
      this.$mcxDialog.alert("hi, 我是alert");
    },
    confirm() {
      this.$mcxDialog.confirm("hi, 我是confirm");
    },
    toast() {
      this.$mcxDialog.toast("hi，我是toast");
    },
    loading() {
      this.$mcxDialog.loading();
    },
    showBottom() {
      this.$mcxDialog.showBottom();
    }
  }
}
</script>
```
### React

In react, you mast import it when you need to use.

```javascript
import mcxDialog from "mcx-dialog-mobile"
```

```javascript
handleClick = (type) => {
  switch (type) {
    case "alert":
      mcxDialog.alert("hi, 我是alert");
      break;
    case "confirm":
      mcxDialog.confirm("hi, 我是confirm");
      break;
    case "toast":
      mcxDialog.toast("hi，我是toast");
      break;
    case "loading":
      mcxDialog.loading();
      break;
    case "bottom":
      mcxDialog.showBottom();
      break;
  }
}
render() {
  return (
    <div className="App">
      <p>
        <button onClick={() => { this.handleClick("alert") }}>alert</button>
        <button onClick={() => { this.handleClick("confirm") }}>confirm</button>
        <button onClick={() => { this.handleClick("toast") }}>toast</button>
        <button onClick={() => { this.handleClick("loading") }}>loading</button>
        <button onClick={() => { this.handleClick("bottom") }}>bottom</button>
      </p>
    </div>
  );
}
```
