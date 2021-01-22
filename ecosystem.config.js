module.exports = {
  apps : [{
    name: 'hqsms-demo',
    script: '/usr/bin/serve -s build',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'hg123',
      host : ['47.115.144.65'],
      ref  : 'origin/main',
      repo : 'git@github.com:zomco/hqsms-demo.git',
      path : '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
