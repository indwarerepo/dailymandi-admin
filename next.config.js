/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    basePath: '',
    publicRuntimeConfig: {
        contextPath: '',
    },
    images: {
        domains: ['aonemartstorageaccount.blob.core.windows.net'],
    },
};

module.exports = nextConfig;
