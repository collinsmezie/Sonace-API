import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({ region: "us-east-1" });

async function getEnvVariable(name: string): Promise<string | null> {
  try {
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: true,
    });

    const response = await ssmClient.send(command);
    return response.Parameter?.Value || null;
  } catch (error) {
    console.error(`Error fetching parameter ${name}:`, error);
    return null;
  }
}

export async function loadConfig() {
  return {
    JWT_SECRET: await getEnvVariable("/sonace/JWT_SECRET"),
    DB_HOST: await getEnvVariable("/sonace/DB_HOST"),
    DB_PORT: Number(await getEnvVariable("/sonace/DB_PORT")) || 5432,
    DB_USERNAME: await getEnvVariable("/sonace/DB_USERNAME"),
    DB_PASSWORD: await getEnvVariable("/sonace/DB_PASSWORD"),
    DB_NAME: await getEnvVariable("/sonace/DB_NAME"),
    DB_SSL: await getEnvVariable("/sonace/DB_SSL"),
  };
}
