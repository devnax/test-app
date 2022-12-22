import Router from './core/BaseRouter'
import { OptionFields, OptionQuery, Option } from './core/types/Model'

interface Args {
   data: OptionFields;
   where: OptionQuery;
   model: Option
}

class OptionRoutes extends Router<Args> {
   basePath: string = `/options`
}

export default new OptionRoutes()