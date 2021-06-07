const fs = require('fs');
const path = require('path');

const {SitemapStream, streamToPromise} = require('sitemap');
const {Readable} = require('stream');

// https://github.com/ekalinin/sitemap.js#generate-a-one-time-sitemap-from-a-list-of-urls
const generateSitemap = sitemapConfig => {
  console.log('\n☢️  Generating sitemap...');

  const {
    publicPath = './public',
    links = [],
    hostname,
    outputName = 'sitemap.xml'
  } = sitemapConfig;

  if (!hostname) {
    console.error(
      `❌ [sitemap] --> you must provide a hostname for your links`
    );

    return;
  }

  const stream = new SitemapStream({hostname});

  return streamToPromise(Readable.from(links).pipe(stream)).then(data => {
    const sitemapXML = data.toString();
    const outputPath = path.resolve(process.cwd(), publicPath);
    const output = path.resolve(`${outputPath}/${outputName}`);

    fs.writeFile(output, sitemapXML, err => {
      if (err) {
        return console.log('❌', err);
      }
      console.log(`✅ sitemap generated.`, output);
    });
  });
};

module.exports = generateSitemap;
