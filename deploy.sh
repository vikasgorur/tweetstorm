#!/bin/bash

WEBSITE_HOST="128.199.239.70"

function build() {
  rm -rf build/* && npm run build
}

function deploy() {
  scp -r build/* $WEBSITE_HOST:vikasgorur.in/tweetstorm
}

function main() {
  build
  deploy
}

main $*
