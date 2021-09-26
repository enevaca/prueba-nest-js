module.exports = {
  apps: [
    {
      name: 'demo_nestjs',
      script: 'dist/main.js',
      autorestart: true,
      watch: true,
      max_memory_restart: '256M',
      env_development: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    dev: {
      user: 'node',
      host: '212.83.163.1',
      repo: 'git@github.com:repo.git',
      ref: 'origin/master',
      path: '/var/www/development',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js --env development',
    },
    production: {
      user: 'ubuntu',
      host: ['192.168.0.13', '192.168.0.14', '192.168.0.15'],
      ref: 'origin/master',
      repo: 'git@github.com:Username/repository.git',
      path: '/var/www/production',
      'pre-deploy': 'git fetch --all',
      'post-deploy':
        'npm install -d && npm run build:production && pm2 reload ecosystem.config.js --env production',
      'pre-setup':
        'npm install -d && npm run build:production && pm2 reload ecosystem.config.js --env production',
    },
  },
};
