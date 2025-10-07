export default {
  // Register the custom field on the server so Strapi knows its underlying type
  register({ strapi }: { strapi: any }) {
    strapi.customFields.register({
      name: 'table',
      plugin: 'table-field',
      type: 'json',
      inputSize: {
        default: 12,
        isResizable: true,
      },
    });
  },
};
