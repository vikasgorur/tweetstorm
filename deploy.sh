#!/bin/bash

WEBSITE_HOST="128.199.239.70"

function build() {
  rm -rf build/* && npm run build
}

function pack() {
  cd build && zip -r ../tweetstorm.zip * && cd ..
}

function deploy() {
  scp tweetstorm.zip $WEBSITE_HOST:
  ssh $WEBSITE_HOST <<EOF
    unzip -o tweetstorm.zip -d vikasgorur.in/tweetstorm
    rm tweetstorm.zip
EOF
}

function main() {
  build
  pack
  deploy
}

main $*
