import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export async function getConfig() {
    console.log(process.env.NODE_ENV);
    // load env file config for local development
    if (process.env.NODE_ENV === 'local') return {};

    // fetch secrets from amazon secret service for test-api.tiwoin.com and api.tiwoin.com
    const secretName = process.env.NODE_ENV === 'production' ? "api.tiwoin.com" : 'test-api.tiwoin.com"';

    try {
        const client = new SecretsManagerClient({ region: "ap-south-1" });
        const envResponse = await client.send(new GetSecretValueCommand({ SecretId: secretName, VersionStage: "AWSCURRENT" }));

        return JSON.parse(envResponse.SecretString || '{}');
    } catch (error) {
        throw new Error("Unable to fetch AWS secrets!");
    }
}

