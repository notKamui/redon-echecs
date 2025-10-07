export default {
  register(app: any) {
    // Defer to admin/src to keep code organized
    return import('./admin/src/index').then((m) => m.default.register(app));
  },
};
