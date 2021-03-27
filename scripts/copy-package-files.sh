echo '☢️  preparing package...'
mkdir dist
mkdir dist/scripts
cp scripts/*.js dist/scripts/.
cp readme.md dist/.
cp license dist/.
cp package.json dist/.
echo '☢️  dist ready.'
