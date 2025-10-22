type PublicEnv = {
  baseUrl: string;
};

function getEnvVar(key: string, fallback?: string): string {
  const value = import.meta.env[key] || fallback;

  if (!value) throw new Error(`Missing environment variable: ${key}`);

  return value;
}

export const publicEnv: PublicEnv = {
  baseUrl: getEnvVar("PUBLIC_API_URL", "http://localhost:4321"),
};
