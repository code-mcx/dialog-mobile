# mcx-dialog-mobile

<p>
  <a href="https://github.com/code-mcx/mcx-dialog-mobile"><img src="https://img.shields.io/badge/language-javascript-green.svg" alt="mcx-dialog-mobile"></a>
  <a href="https://github.com/code-mcx/mcx-dialog-mobile"><img src="https://img.shields.io/badge/npm-v0.2.0-blue.svg" alt="mcx-dialog-mobile"></a>
</p>

# Description

这个对话框是用原生javascript实现的。 它使用在移动web端，它可以与vue、react一起使用

# 入门

## 浏览器

首先引入CSS和js，它们位于dist目录中。你不能在dist目录下移动任何东西directory

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

然后，你可以得到一个名为mcxDialog的对象

```javascript
<script type="text/javascript">
  // Alert
  mcxDialog.alert("hi, 我是alert");

  // Confirm
  mcxDialog.confirm("hi, 我是confirm");

  // Toast
  mcxDialog.toast("hi，我是toast");

  // Loading
  mcxDialog.loading({src: "dist/img"});

  // Bottom dialog
  mcxDialog.showBottom();
</script>
```
更多使用请参见 [index_zh.html](https://github.com/code-mcx/mcx-dialog-mobile/blob/master/index_zh.html)

## Npm

如果你正在使用npm，先安装插件包

```
npm install mcx-dialog-mobile
```

导入依赖

```javascript
// CommonJS
let McxDialog = require("mcx-dialog-mobile").default

// ES6
import McxDialog from "mcx-dialog-mobile"
```

### Vue

mcx-dialog 在vue中提供了更好的操作

```javascript
import McxDialog from "mcx-dialog-mobile"
// Install as Vue's plugin
Vue.use(McxDialog)
```

在单页应用程序中，可以在任何地方调用它

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

在React中，你需要在使用时导入它

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
