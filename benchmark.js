import fs from 'fs';
import zlib from 'zlib';
import readline from 'readline';
import inchiwasm from './lib/inchi-wasm.js';
import inchidylib from './lib/inchi-dylib.js';

let runinchi;

if (process.argv[2] == 'wasm') {
  console.log('running wasm');
  runinchi = inchiwasm;
} else if (process.argv[2] == 'dylib') {
  console.log('running dylib');
  runinchi = inchidylib;
} else {
  throw Error('arg must be one of \'wasm\' or \'dylib\'');
}

console.log('building records...');

const path = './data/SureChEMBL_20210101_27.sdf.gz';
const reader = readline.createInterface({
  input: fs.createReadStream(path).pipe(zlib.createGunzip())
});

const records = [ ];
let molfile = '';
let target = '';
let captureInchi = false;

reader.on('line', line => {
  if (captureInchi) {
    target = line;
    captureInchi = false;
  } else if (line === '$$$$') {
    records.push({ molfile, target });

    molfile = '';
    target = '';
  } else if (line == '> <InChI>') {
    captureInchi = true;
  } else if (!molfile.endsWith('M  END')) {
    molfile += line;

    if (line !== 'M  END') {
      molfile += '\n';
    }
  }
});

reader.on('close', async () => {
  console.log('benchmarking...');

  const instance = await runinchi();
  let misses = [ ];
  let errors = [ ];
  let count = 0;

  const start = Date.now();

  for (const [ i, { molfile, target } ] of records.entries()) {
    try {
      const inchi = instance.molfileToInChI(molfile);

      if (inchi !== target) {
        misses.push(i);
      }
    } catch (e) {
      errors.push(i);
    }

    count += 1;
  }

  console.log('time', `${Date.now() - start} ms`);
  console.log('count:', count);
  console.log('misses:', `[${misses.join(', ')}]`);
  console.log('errors:', `[${errors.join(', ')}]`);
});
