import Router from './core/BaseRouter'
import { TermFields, TermQuery, Term } from './core/types/Model'

interface Args {
   data: TermFields;
   where: TermQuery;
   model: Term
}

class TermRoutes extends Router<Args> {
   basePath: string = `/terms`
}

export default new TermRoutes()