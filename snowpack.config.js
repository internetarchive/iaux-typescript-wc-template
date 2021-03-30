module.exports = {
  buildOptions: {
    out: 'github-page',
  },
  mount: {
    demo: { url: '/', static: true },
    src: { url: '/dist/src' },
  },
};
