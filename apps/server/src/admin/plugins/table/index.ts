import Input from './components/Input'
import TableIcon from './components/TableIcon'

export const tableFieldPlugin = () => ({
  name: 'table',
  type: 'json',
  intlLabel: {
    id: 'global.table.label',
    defaultMessage: 'Table',
  },
  intlDescription: {
    id: 'global.table.description',
    defaultMessage: 'Edit a table and store it as JSON',
  },
  icon: TableIcon,
  components: {
    Input: async () => ({ default: Input }),
  },
  options: {
    base: [
      {
        sectionTitle: {
          id: 'global.table.options',
          defaultMessage: 'Table options',
        },
        items: [
          {
            intlLabel: {
              id: 'global.table.options.headers',
              defaultMessage: 'Show header row',
            },
            name: 'options.showHeader',
            type: 'checkbox',
            value: true,
          },
          {
            intlLabel: {
              id: 'global.table.options.minRows',
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
