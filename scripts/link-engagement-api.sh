#!/bin/sh

rm -rf `pwd`/node_modules/@livelike
source ~/.nvm/nvm.sh
nvm use node
npm link @livelike/engagement-api --install-links