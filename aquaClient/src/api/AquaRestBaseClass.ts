import fetch from "node-fetch";
import { EnvAquaRestConfig } from "../../envAquaRestConfig";

export interface IAquaRestConfig {
    username: string;
    password: string;
    url: string;
}

export class AquaRestBaseClass {
    private readonly config: IAquaRestConfig;
    private accessToken: string;

    protected constructor() {
        this.config = new EnvAquaRestConfig();
    }

    protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
        return new Promise<string>((resolve, _) => {
            if (!this.accessToken) {
                this.refreshAccessToken()
                    .then(accessToken => {
                        this.accessToken = accessToken;
                        resolve(this.accessToken)
                    });
            }
            else {
                resolve(this.accessToken);
            }
        })
        .then<RequestInit>(accessToken => {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            };
            return options;
        })
    };

    private async refreshAccessToken(): Promise<string> {
        return fetch(`${this.config.url}/api/token`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'grant_type': 'password',
                    'username': this.config.username,
                    'password': this.config.password
                })
            })
            .then(response => response.json())
            .then(json => (json as any).access_token);
    }
}