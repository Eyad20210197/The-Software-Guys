const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://the-software-guys-web.vercel.app',
];

function getAllowedOrigins() {
  const envOrigins = [process.env.FRONTEND_URL, process.env.CORS_ORIGINS]
    .filter(Boolean)
    .flatMap((origins) => origins!.split(','))
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]);
}

function isAllowedVercelWebOrigin(origin: string) {
  return /^https:\/\/the-software-guys-web(?:-[a-z0-9-]+)*\.vercel\.app$/.test(origin);
}

export function getCorsOptions() {
  const allowedOrigins = getAllowedOrigins();

  return {
    origin(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = origin.replace(/\/+$/, '');
      callback(
        null,
        allowedOrigins.has(normalizedOrigin) || isAllowedVercelWebOrigin(normalizedOrigin),
      );
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
  };
}
