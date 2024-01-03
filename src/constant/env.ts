export const deploymentURL = process.env.NEXT_PUBLIC_DEPLOYMENT_URL
  ? `${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const apiURL = process.env.NEXT_PUBLIC_DEPLOYMENT_DOMAIN
  ? `${process.env.NEXT_PUBLIC_DEPLOYMENT_DOMAIN}`
  : process.env.NEXT_PUBLIC_DEPLOYMENT_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DEPLOYMENT_DOMAIN}`
  : 'http://localhost:3000/api';
