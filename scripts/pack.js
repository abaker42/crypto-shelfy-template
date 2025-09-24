const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// This script builds the Next app and creates a zip of the minimal files
// for distribution. It excludes node_modules and .next.

const root = process.cwd();
const outDir = path.join(root, 'dist-for-pack');

function run(cmd) {
  console.log('> ' + cmd);
  execSync(cmd, { stdio: 'inherit' });
}

// 1) Build
run('npm run build');

// 2) Prepare dist folder
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

// Files/dirs to include
const include = [
  'app', 'components', 'lib', 'public', 'README.md', 'SETUP.md', 'LICENSE', 'package.json', '.env.example'
];

for (const item of include) {
  const src = path.join(root, item);
  if (!fs.existsSync(src)) continue;
  const dest = path.join(outDir, item);
  // copy recursive
  execSync(`powershell -Command "Copy-Item -Path '${src}' -Destination '${dest}' -Recurse -Force"`);
}

// 3) Zip it
const zipPath = path.join(root, `crypto-shelfy-template-v${require('./..\/package.json').version}.zip`);
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('Package created at', zipPath);
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory(outDir + '/', false);
archive.finalize();
