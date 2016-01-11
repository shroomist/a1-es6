System.config({
  defaultJSExtensions: true,
  transpiler: 'babel',
  babelOptions: {
    stage: 0
  },
  map: {
    'ng-forward': 'https://gist.githubusercontent.com/timkindberg/d93ab6e17fc07b4db7e9/raw/b311a63e0e96078774e69f26d8e8805b7c8b0dd2/ng-forward.0.0.1-alpha.10.js',
    'babel': 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js',
  },
  paths: {
    app: 'src'
  },
  packages: {
    app: {
      main: 'app.js',
      defaultExtension: 'js',
    }
  }
});
