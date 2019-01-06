import { getAnimationEndName } from "./utils/compatible"

import "./css/dialog-mobile.css"

function addClass(e, c) {
  let newclass = e.className.split(" ");
  if (e.className === "") newclass = [];
  newclass.push(c);
  e.className = newclass.join(" ");
}

function extend(source, target) {
  for (let key in target) {
    source[key] = target[key];
  }
  return source;
}

function getFontSize() {
  let clientWidth = document.documentElement.clientWidth;
  if (clientWidth < 640) {
    return 16 * (clientWidth / 375) + "px";
  } else {
    return 16;
  }
}

const layer = {
  initOpen(dom, options) {
    dom.style.fontSize = getFontSize();

    let body = document.querySelector("body");
    let bg = document.createElement("div");
    addClass(bg, "dialog-mobile-bg");
    if (options.showBottom == true) {
      addClass(bg, "animation-bg-fadeIn");
    }

    if (options.bottom) {
      bg.addEventListener("click", () => {
        handleClose();
      });
    }

    body.appendChild(bg);
    body.appendChild(dom);

    let animationEndName = getAnimationEndName(dom);
    function handleClose() {
      if (animationEndName) {
        layer.close([bg]);
        addClass(dom, options.closeAnimation);
        dom.addEventListener(animationEndName, () => {
          layer.close([dom]);
        });
      } else {
        layer.close([bg, dom]);
      }
    }

    // set button click event
    options.btns.forEach((btn, i) => {
      if (i != 0 && i <= options.btns.length - 1) {
        if (!options.bottom) {
          btn.addEventListener("click", () => {
            handleClose();
            options.sureBtnClick();
          });
        } else {
          btn.addEventListener("click", function() {
            handleClose();
            options.btnClick(this.getAttribute("i"));
          });
        }
      } else {
        btn.addEventListener("click", handleClose);
      }
    });

    if (!options.bottom) {
      // set position
      dom.style.top = (document.documentElement.clientHeight - dom.offsetHeight) / 2 + "px";
      dom.style.left = (document.documentElement.clientWidth - dom.offsetWidth) / 2 + "px";
    }
  },
  close(doms) {
    let body = document.querySelector("body");
    for (let i = 0; i < doms.length; i++) {
      body.removeChild(doms[i]);
    }
  }
};

const mcxDialog = {
  alert(content, options) {
    let opts = {
      titleText: "",
      sureBtnText: "确定"
    };
    opts = extend(opts, options);
    let btn = document.createElement("div");
    btn.innerText = opts.sureBtnText;
    addClass(btn, "dialog-button");

    opts.btns = [btn];

    this.open(content, opts);
  },
  confirm(content, options) {
    let opts = {
      titleText: "",
      cancelBtnText: "取消",
      sureBtnText: "确定",
      sureBtnClick: function() { }
    };
    opts = extend(opts, options);

    let cancelBtn = document.createElement("div");
    cancelBtn.innerText = opts.cancelBtnText;
    addClass(cancelBtn, "dialog-cancel-button");

    let sureBtn = document.createElement("div");
    sureBtn.innerText = opts.sureBtnText;
    addClass(sureBtn, "dialog-sure-button");

    opts.btns = [cancelBtn, sureBtn];
    this.open(content, opts);
  },
  open(content, options) {
    let dialog = document.createElement("div");
    let dialogContent = document.createElement("div");

    addClass(dialog, "dialog-mobile");
    addClass(dialog, "animation-zoom-in");
    addClass(dialogContent, "dialog-content");

    dialogContent.innerText = content;

    if (options.titleText) {
      let dialogTitle = document.createElement("div");
      addClass(dialogTitle, "dialog-title");
      dialogTitle.innerText = options.titleText;
      dialog.appendChild(dialogTitle);
    }

    dialog.appendChild(dialogContent);

    options.btns.forEach((btn, i) => {
      dialog.appendChild(btn);
    });
    options.closeAnimation = "animation-zoom-out";

    layer.initOpen(dialog, options);
  },
  showBottom(options) {
    let opts = {
      title: "",
      cancelText: "取消",
      btn: ["删除"],
      btnColor: [],
      btnClick: function(index) { }
    };
    opts = extend(opts, options);
    opts.bottom = true;
    if (opts.btn.length == 1 && opts.btn[0] == "删除") {
      opts.btnColor = ["#EE2C2C"];
    }

    let bottomDialog = document.createElement("div");
    let title = document.createElement("div");
    let dialogItem = document.createElement("div");
    let cancelBtn = document.createElement("div");
    title.innerText = opts.title;
    cancelBtn.innerText = opts.cancelText;
    addClass(bottomDialog, "dialog-mobile-bottom");
    addClass(bottomDialog, "animation-bottom-in");
    addClass(title, "bottom-btn-title");
    addClass(dialogItem, "bottom-btn-item");
    addClass(cancelBtn, "dialog-cancel-btn");
    if (opts.title) {
      bottomDialog.appendChild(title);
    }
    bottomDialog.appendChild(dialogItem);
    bottomDialog.appendChild(cancelBtn);

    opts.btns = [];
    opts.btns.push(cancelBtn);
    opts.btn.forEach((b, i) => {
      let btn = document.createElement("div");
      btn.innerText = opts.btn[i];
      btn.setAttribute("i", i + 1);
      addClass(btn, "dialog-item-btn");
      if (opts.btnColor[i])
        btn.style.color = opts.btnColor[i];
      dialogItem.appendChild(btn);
      opts.btns.push(btn);
    });
    opts.closeAnimation = "animation-bottom-out";
    opts.showBottom = true;

    layer.initOpen(bottomDialog, opts);
  },
  toast(content, time) {
    time = time || 3;
    let toast = document.createElement("div");
    let toastContent = document.createElement("div");

    addClass(toast, "dialog-mobile-toast");
    addClass(toast, "animation-fade-in");
    addClass(toastContent, "toast-content");

    toastContent.innerText = content;

    toast.appendChild(toastContent);

    let body = document.querySelector("body");
    body.appendChild(toast);

    toast.style.fontSize = getFontSize();
    toast.style.left = (document.documentElement.clientWidth - toast.offsetWidth) / 2 + "px";

    setTimeout(function() {
      body.removeChild(toast);
    }, time * 1000);
  },
  loadElement: [],
  loading(options) {
    let opts = {
      src: "img",
      hint: ""
    }
    opts = extend(opts, options);

    let loadingBg = document.createElement("div");
    let loading = document.createElement("div");
    let img = document.createElement("img");

    addClass(loadingBg, "mobile-loading-bg");
    addClass(loading, "mobile-loading");
    addClass(loading, "animation-zoom-in");
    // img.src = opts.src + "/loading.gif";
    img.src = require("./img/loading.gif");
    loading.appendChild(img);

    if (opts.hint) {
      let loadingContent = document.createElement("div");
      addClass(loadingContent, "loading-content");
      loadingContent.innerText = opts.hint;
      loading.appendChild(loadingContent);
    }

    let body = document.querySelector("body");
    body.appendChild(loadingBg);
    body.appendChild(loading);

    loading.style.fontSize = getFontSize();
    loading.style.left = (document.documentElement.clientWidth - loading.offsetWidth) / 2 + "px";
    loading.style.top = (document.documentElement.clientHeight - loading.offsetHeight) / 2 + "px";

    this.loadElement.push(loadingBg);
    this.loadElement.push(loading);
  },
  closeLoading() {
    layer.close(this.loadElement);
    this.loadElement = [];
  }
}

// providing better operations in Vue
mcxDialog.install = (Vue, options) => {
  Vue.prototype.$mcxDialog = mcxDialog;
}

export default mcxDialog
