module.exports = {
    apps: [{
      name: 'tusamgroup',
      script: 'node_modules/.bin/next',
      args: '-p 3000',
      instances: 'max',
      exec_mode: 'cluster',
      exec_interpreter: "/root/.nvm/versions/node/v24.13.0/bin/node",
      autorestart: true,
      watch: false,
      env_production: {
     	 NODE_ENV: 'production',
     	 PORT: 3000,
     	 NODE_OPTIONS: '--max-old-space-size=1536'
      }
    }]
  };
