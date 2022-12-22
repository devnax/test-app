import Router from './core/BaseRouter'
import { TranslateFields, TranslateQuery, Translate } from './core/types/Model'

interface ArgsProps {
   where: TranslateQuery;
   data: TranslateFields;
   model: Translate
}

class TranslateRoutes extends Router<ArgsProps> {
   basePath: string = `/translates`
}

export default new TranslateRoutes()