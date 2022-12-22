import Router from './core/BaseRouter'
import { VerificationFields, VerificationQuery, Verification } from './core/types/Model'

interface Args {
   data: VerificationFields;
   where: VerificationQuery;
   model: Verification
}

class VerificationRoutes extends Router<Args> {
   basePath: string = `/verifications`
}

export default new VerificationRoutes()