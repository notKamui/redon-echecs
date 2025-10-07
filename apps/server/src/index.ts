// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
    register({ strapi }: any) {
    // Ensure the custom field is registered early during app register
    try {
        // Register a global custom field `global::table` that stores JSON
        strapi.customFields.register({
          name: 'table',
          type: 'json',
          inputSize: { default: 12, isResizable: true },
        });
    } catch {
      // Ignore if already registered by the plugin
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
