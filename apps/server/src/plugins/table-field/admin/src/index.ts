import TableIcon from './components/TableIcon'

export default {
  register(app: any) {
    app.customFields.register({
      name: 'table',
      // global registration (omit pluginId)
      type: 'json',
      intlLabel: {
        id: 'table-field.table.label',
        defaultMessage: 'Table',
      },
      intlDescription: {
        id: 'table-field.table.description',
        defaultMessage: 'Edit a table and store it as JSON',
      },
      icon: TableIcon,
      components: {
        Input: async () =>
          import('./components/Input').then((m) => ({
            default: m.default,
          })),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: 'table-field.table.options.base',
              defaultMessage: 'Table options',
            },
            items: [
              {
                intlLabel: {
                  id: 'table-field.table.options.headers',
                  defaultMessage: 'Show header row',
                },
                name: 'options.showHeader',
                type: 'checkbox',
                value: true,
              },
              {
                intlLabel: {
                  id: 'table-field.table.options.minRows',
                  defaultMessage: 'Minimum rows',
                },
                name: 'options.minRows',
                type: 'number',
                value: 1,
              },
            ],
          },
        ],
        advanced: [],
      },
    })
  },
}
