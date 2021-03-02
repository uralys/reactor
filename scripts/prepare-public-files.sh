#!/bin/bash
echo '👨🏽‍🚀 Preparing public files';
cp -r public/ dist/public/
cp -r dist/min/* dist/public/.

echo '👨🏽‍🚀 ✅ done!';
