const ffi = require("ffi-napi");
const ref = require("ref-napi");

const libinchi = async() => {
  const instance = ffi.Library("./bin/inchi_wasm.dylib", {
    molfile_to_inchi: [
      ref.types.int, [
        ref.refType('char'), ref.refType('char'), ref.refType('char')
      ]
    ]
  });
  const molfile = Buffer.alloc(0x8000);
  const options = Buffer.alloc(0x1000);
  const result = Buffer.alloc(0x8000);

  const molfileToInChI = (mol, opts = '') => {
    molfile.writeCString(mol);

    const status = instance.molfile_to_inchi(molfile, options, result);

    if (status < 0) {
      throw Error(result.readCString());
    }

    return result.readCString();
  };

  return { molfileToInChI };
};

export default libinchi
