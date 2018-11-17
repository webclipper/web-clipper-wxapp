module.exports = {
  copy: {
    patterns: [
      {
        from: 'src/components/wemark', // wemark 所在位置
        to: 'dist/components/wemark'
      }
    ]
  },
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  weapp: {},
  h5: {}
};
