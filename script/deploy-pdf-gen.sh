#!/bin/sh
ssh jenkins@23.239.4.176 << EOF
 cd /home/www/pdf-server
 git checkout ${BRANCH_NAME}
 git pull
 npm install — production
 cd /home/www
 pm2 restart ecosystem.config.js --only pdf-server
 exit
EOF