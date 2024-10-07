/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    basePath: '',
    publicRuntimeConfig: {
        contextPath: '',
    },
    images: {
        domains: ['dailymandistorageaccount.blob.core.windows.net'],
    },
    webpack: (config) => {
        // Resolve fs module issues if CKEditor or other packages rely on them
        config.resolve.fallback = { fs: false, path: false };

        return config;
    },
};

module.exports = nextConfig;
