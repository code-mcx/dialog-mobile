function getAnimationEndName(dom) {
  let cssAnimation = ["animation", "webkitAnimation"];
  let animationEnd = {
    "animation":"animationend",
    "webkitAnimation":"webkitAnimationEnd"
  };
  for (let i = 0; i < cssAnimation.length; i++) {
    if (dom.style[cssAnimation[i]] != undefined) {
      return animationEnd[cssAnimation[i]];
    }
  }
  return undefined;
}

export { getAnimationEndName }
