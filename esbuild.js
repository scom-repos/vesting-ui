const dependencies = require('./package.json').dependencies || {};
const Fs = require('fs');
const { promises: fs } = require("fs")

const GlobalBuildModuleList = [
  {
    sourceFilePath: 'src/assets/index.ts',
    distFilePath: './dist/assets/index.js',
    moduleName: '@vesting/assets'
  },
  {
    sourceFilePath: 'src/global/index.ts',
    distFilePath: './dist/global/index.js',
    moduleName: '@vesting/global'
  },
  {
    sourceFilePath: 'src/store/index.ts',
    distFilePath: './dist/store/index.js',
    moduleName: '@vesting/store'
  },
  {
    sourceFilePath: 'src/common/index.ts',
    distFilePath: './dist/common/index.js',
    moduleName: '@vesting/common'
  },
  {
    sourceFilePath: 'src/main/index.tsx',
    distFilePath: './dist/main/index.js',
    moduleName: '@vesting/main'
  }
]

const GlobalModuleESBuildConfig = {
  entryPoints: GlobalBuildModuleList.map(v => v.sourceFilePath),
  external: [
    '@vesting/assets', 
    '@ijstech/components',
    '@ijstech/eth-wallet',
    '@vesting/global',
    '@vesting/store',
    '@vesting/common',
    '@vesting/assets',
    '@scom/vesting-sdk',
    '@vesting/main',
    ...Object.keys(dependencies)
  ]
}

const LocalModuleESBuildConfig = {
  entryPoints: [
    'src/claims/index.tsx',
    'src/claimDetail/index.tsx',
    'src/locks/index.tsx',
    'src/lockDetail/index.tsx',
    'src/newCampaign/index.tsx',
    'src/newLock/index.tsx',
    'src/admin/index.tsx'
  ],
  external: [
    '@vesting/assets',
    '@vesting/global',
    '@vesting/store',
    '@vesting/common',
    '@ijstech/components', 
    '@ijstech/eth-wallet', 
    '@scom/vesting-sdk',
    '@vesting/main',
    ...Object.keys(dependencies)
  ]
}

async function readFile(fileName) {
  return new Promise((resolve, reject) => {
      Fs.readFile(fileName, 'utf8', function (err, data) {
          if (err)
              reject(err)
          else
              resolve(data)
      })
  })
}

async function writeContent(filePath, moduleName) {
  let content = await readFile(filePath);
  content = `define("${moduleName}",(require, exports)=>{
  ${content}  
  });`
  Fs.writeFileSync(filePath, content);
}

async function buildSDKs() {
  const SDKList = [
    './node_modules/@scom/vesting-sdk/dist/index.js',
  ]
  let promises = [];
  for (let sdk of SDKList) {
    promises.push(readFile(sdk));
  }

  let content = '';
  await fs.mkdir('./dist/sdks', { recursive: true });
  await Promise.all(promises).then((dataArr) => {
    for (let data of dataArr) {
      content += data + ';';
    }
  })
  Fs.writeFileSync('./dist/sdks/index.js', content);
};

async function buildGlobalModule() {
  await require('esbuild').build({
    ...GlobalModuleESBuildConfig,
    outdir: 'dist',
    bundle: true,
    minify: false,
    format: 'cjs',
    target: 'ES2017',
    jsx: 'transform',
    plugins: [],
  }).catch(() => process.exit(1));

  await Promise.all(GlobalBuildModuleList.map(v => writeContent(v.distFilePath, v.moduleName)));
  await buildSDKs();
}

async function buildLocalModule() {
  require('esbuild').build({
    ...LocalModuleESBuildConfig,
    outdir: 'dist',
    bundle: true,
    minify: false,
    format: 'iife',
    target: 'ES2017',
    jsx: 'transform',
    plugins: [],
  }).catch(() => process.exit(1));
}

async function buildConfigModule() {
  require('esbuild').build({
    entryPoints: [
      'src/config/index.tsx'
    ],
    external: [
      '@ijstech/eth-wallet',
      '@ijstech/components',  
      ...Object.keys(dependencies)
    ],
    outdir: 'dist/config',
    bundle: true,
    minify: false,
    format: 'iife',
    target: 'ES2017',
    jsx: 'transform',
    plugins: [],
  }).catch(() => process.exit(1));
}

buildLocalModule();
buildGlobalModule();
buildConfigModule();