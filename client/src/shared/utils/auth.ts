import PUBLIC_RUNTIME_CONFIG from '@/shared/utils/public-runtime-config';

export function generateGoogleAuthUrl() {
   const searchParams = new URLSearchParams({
      response_type: 'code',
      redirect_uri: `http://localhost:3000/api/auth/google/callback`,
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      client_id: PUBLIC_RUNTIME_CONFIG.GOOGLE_CLIENT_ID
   });
   
   return `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}`;
}

