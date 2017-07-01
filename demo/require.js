require = module => window[module];

window.module = {};

Object.defineProperty(window.module, 'exports', {
  set(val) {
    window[val.name] = val;
  }
});
