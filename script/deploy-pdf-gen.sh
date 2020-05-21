#!/bin/sh
rm -R node_modules
ssh jenkins@23.239.4.176 mkdir /home/www/pdf-server-tmp
scp -r * jenkins@23.239.4.176:/home/www/pdf-server-tmp

ssh jenkins@23.239.4.176 << EOF
    export PATH=/usr/local/bin
    cd /home/www/pdf-server-tmp
    npm i
    cd ..
    cp -Tr pdf-server-tmp pdf-server
    rm -R pdf-server-tmp
    pm2 restart --only pdf-server
    exit
EOF