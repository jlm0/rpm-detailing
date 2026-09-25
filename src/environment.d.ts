declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL?: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
      VERCEL_URL?: string
      VERCEL_DEPLOYMENT_ID?: string
      PAYLOAD_MEDIA_DIR?: string
      BLOB_READ_WRITE_TOKEN?: string
      RESEND_API_KEY?: string
      EMAIL_FROM_ADDRESS?: string
    }
  }
}

export {}
