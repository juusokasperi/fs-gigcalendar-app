#!/bin/sh

cd /app/

rm -rf node_modules/
npm install --include=dev

exec npm run dev
