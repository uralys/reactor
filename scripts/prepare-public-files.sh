#!/bin/bash
echo '👨🏽‍🚀 Preparing public files';
cp -r public/ dist/public/
cp -r dist/min/*.js dist/public/.
cp -r dist/min/*.txt dist/public/.

echo '👨🏽‍🚀 ✅ done!';
