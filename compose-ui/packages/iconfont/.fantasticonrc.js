module.exports = {
  inputDir: './src/icons', // (required)
  outputDir: './dist/iconfont', // (required)
//  fontTypes: ['ttf', 'woff', 'woff2'],
  assetTypes: ['css', 'scss', 'html', 'ts'],
  name: 'engage-icons',
  prefix: 'mui-icons',
  selector: '.mui-icons',
//  normalize: true,
//  fontsUrl: '/static/fonts',
/*  formatOptions: {
    // Pass options directly to `svgicons2svgfont`
    woff: {
      // Woff Extended Metadata Block - see https://www.w3.org/TR/WOFF/#Metadata
      metadata: '...'
    },
    json: {
      // render the JSON human readable with two spaces indentation (default is none, so minified)
      indent: 2
    },
    ts: {
      // select what kind of types you want to generate (default `['enum', 'constant', 'literalId', 'literalKey']`)
      types: ['constant', 'literalId'],
      // render the types with `'` instead of `"` (default is `"`)
      singleQuotes: true
    }
  },*/
  formatOptions: {
    svg: {
      centerHorizontally: true,
      centerVertically: true
    }
  },
  // Use a custom Handlebars template
  templates: {
    css: './src/templates/css.hbs',
    scss: './src/templates/scss.hbs',
    html: './src/templates/html.hbs'
  },
/*
  pathOptions: {
    ts: './src/types/icon-types.ts',
    json: './misc/icon-codepoints.json'
  },
*/
/*
  codepoints: {
    'chevron-left': 57344, // decimal representation of 0xe000
    'chevron-right': 57345,
    'thumbs-up': 57358,
    'thumbs-down': 57359
  }
*/
};
