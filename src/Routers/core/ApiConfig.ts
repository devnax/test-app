import { isServer } from "detect-server"
export type configkeys = "guard" | "api_url" | "encript" | "onFaild"

export const ApiConfig = new Map<configkeys, any>()
// Default
if (!isServer) {
   ApiConfig.set("encript", false)
   ApiConfig.set("guard", location?.origin)
   ApiConfig.set("api_url", location?.origin)
}

export default ApiConfig