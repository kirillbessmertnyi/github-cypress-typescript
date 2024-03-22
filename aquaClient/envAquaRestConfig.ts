import { IAquaRestConfig } from "./src/api/AquaRestBaseClass";

export class EnvAquaRestConfig implements IAquaRestConfig {
    /**
     * Returns a valid value for the Authorization header.
     * Used to dynamically inject the current auth header.
     */
     public get username(): string {
        return process.env['AQUA_USERNAME'] as string;
      }
    
      public get password(): string {
        return process.env['AQUA_PASSWORD'] as string;
      }
    
      public get url(): string {
        return process.env['AQUA_URL'] as string;
      }
}
