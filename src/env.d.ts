interface ImportMetaEnv {
  readonly PUBLIC_VERIDIA_API_POST:string;
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  readonly PUBLIC_CLERK_SIGN_IN_URL:string;
  readonly PUBLIC_CLERK_SIGN_UP_URL:string;
  readonly PUBLIC_CLERK_IS_SATELLITE:string;
  readonly PUBLIC_CLERK_PROXY_URL:string;
  readonly PUBLIC_CLERK_DOMAIN:string;
  readonly PUBLIC_CLERK_JS_URL:string;
  readonly PUBLIC_CLERK_JS_VARIANT:string
  readonly PUBLIC_CLERK_JS_VERSION:string;
  readonly PUBLIC_CLERK_TELEMETRY_DISABLED:string;
  readonly PUBLIC_CLERK_TELEMETRY_DEBUG:string;
  readonly CLERK_SECRET_KEY:string;
  readonly CLERK_JWT_KEY:string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}