const sass = require('sass');
const fs = require('fs-extra');

const sourceDir = './';
const destDir = './dist';

const files = [
  {
    src: `${sourceDir}/src/mui-theme.scss`,
    dest: `${destDir}/mui-theme.css`
  },
  {
    src: `${sourceDir}/src/mui-theme-legacy.scss`,
    dest: `${destDir}/mui-theme-legacy.css`
  },
  {
    src: `${sourceDir}/src/top-navigation-element-theme.scss`,
    dest: `${destDir}/top-navigation-element-theme.css`
  },
];


async function cleanDist() {
  try {
    await fs.remove(destDir);
  } catch (error) {
    console.error('cleaning dist dir failed.');
  }

}

async function compileSass(inputFile, outputFile) {
  const styleIncludePaths = ['../../node_modules'];
  const result = sass.renderSync({
    file: inputFile,
    outFile: outputFile,
    includePaths: styleIncludePaths
  });

  await fs.outputFile(outputFile, result.css);
}

/*
async function copyOldTheme() {
  console.log('Copy old theme css');
  fs.copy(`${sourceDir}src/material-theme-legacy.css`, `${destDir}/material-theme-legacy.css`);
}
*/


async function runAll() {
  const args = process.argv.slice(2);
  if (args.includes('cleandist')) {
    console.log('cleaning dist...')
    await cleanDist();
  }

  console.log('Compiling mui SCSS themes...');
  await Promise.all(files.map(file => compileSass(file.src, file.dest).catch(err => console.error(err))));
/*
  try {
    await copyOldTheme();
  } catch (e) {
    console.error('copy failed', e)
  }
*/

  console.log('All done :)');
}

runAll();
