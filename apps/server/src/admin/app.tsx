import { tableFieldPlugin } from './plugins/table'

export default {
  register(app: any) {
    app.customFields.register(tableFieldPlugin())
  },
}
