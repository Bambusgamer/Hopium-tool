module.exports = {
    apps: [{
        name: 'h2-tool',
        namespace: 'Hopium-tool',
        script: 'npm',
        args: 'run start',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '300M',
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        },
    }],
};