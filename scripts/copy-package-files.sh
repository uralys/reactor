echo '☢️  preparing package...'
mkdir dist
mkdir dist/scripts
cp scripts/*.js dist/scripts/.
cp -r src dist/.
cp -r boot dist/.
cp readme.md dist/.
cp license dist/.
cp package.json dist/.
echo '☢️  dist ready.'
