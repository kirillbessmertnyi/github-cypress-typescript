import { IAquaRestConfig } from "./src/api/AquaRestBaseClass";

export class EnvAquaRestConfig implements IAquaRestConfig {
    /**
     * Returns a valid value for the Authorization header.
     * Used to dynamically inject the current auth header.
     */
    public get username():string {
        return "start";
    }

    public get password():string {
        return "default";
    }

    public get url():string {
        return "https://aqua-auto-aqamasterpla.aqua-testing.com/aquaWebNG";
    }
}
