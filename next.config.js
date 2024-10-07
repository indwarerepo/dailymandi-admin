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
};

module.exports = nextConfig;
