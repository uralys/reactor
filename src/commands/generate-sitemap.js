const fs = require('fs');
const path = require('path');

const {SitemapStream, streamToPromise} = require('sitemap');
const {Readable} = require('stream');

// https://github.com/ekalinin/sitemap.js#generate-a-one-time-sitemap-from-a-list-of-urls
const generateSitemap = sitemapConfig => {
  const {publicPath = 'public', links = []} = sitemapConfig;
  const stream = new SitemapStream({hostname: 'https://...'});

  return streamToPromise(Readable.from(links).pipe(stream)).then(data => {
    const sitemapXML = data.toString();
    const outputName = `sitemap.xml`;
    const output = path.resolve(__dirname, `${publicPath}/${outputName}`);

    fs.writeFile(output, sitemapXML, err => {
      if (err) {
        return console.log('❌', err);
      }
      console.log(`✅ sitemap generated.`, output);
    });
  });
};

module.exports = generateSitemap;
