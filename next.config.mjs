/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export',
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  // Optional: Add a base path if you are deploying to a subdirectory (e.g. /repo-name)
  // basePath: '/truth-or-dare',

  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
