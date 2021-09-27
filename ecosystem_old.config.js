module.exports = {
  apps: [
    {
      name: 'demo_nestjs',
      script: 'main.js',
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
    development: {
      user: 'noel',
      host: ['192.168.1.20'],
      repo: 'git@github.com:enevaca/prueba-nest-js.git',
      ref: 'origin/main',
      path: '/home/noel/app/development',
      // 'pre-deploy-local': 'echo pre-deploy-local',
      'pre-setup': 'pwd && ls -la',
      'pre-deploy':
        'pwd && git fetch --all && npm install && npm run build && cp ormconfig.json dist/ && cp package.json dist/ && cp ecosystem.config.js dist/ && ls -la',
      'post-deploy':
        'cd dist && pwd && npm install --prod && pm2 reload ecosystem.config.js --env development',
      // 'post-deploy': 'pm2 startOrRestart ecosystem.config.js --env development',
    },
    production: {
      user: 'ubuntu',
      host: ['192.168.1.20'],
      ref: 'origin/main',
      repo: 'git@github.com:Username/repository.git',
      path: '/var/www/production',
      'pre-deploy': 'git fetch --all',
      'post-deploy':
        'npm install -d && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup':
        'npm install -d && npm run build:production && pm2 reload ecosystem.config.js --env production',
    },
  },
};
