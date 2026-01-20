/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'truth-or-dare';

const nextConfig = {
  /* config options here */
  output: 'export',

  // Set basePath to /repo-name only in production to match GitHub Pages header
  basePath: isProd ? `/${repoName}` : '',

  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },

  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
