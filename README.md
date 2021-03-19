# InChI Benchmark Wasm vs. Dylib

This benchmark compares the speed and behavior of two versions of an InChI library. One is complied to a native binary (dylib). The other is compiled to WebAssembly (wasm).

The data set is composed of 114,173 new SureCheMBL records. The file containing them (`data/SureChEMBL_20210101_27.sdf.gz`) is [available for download](https://ftp.ebi.ac.uk/pub/databases/chembl/SureChEMBL/data/), and is licensed under the ["CC Attribution-ShareAlike 3.0 Unported license"](https://creativecommons.org/licenses/by-sa/3.0/).

This benchmark is distributed under the terms of the MIT License. See
[LICENSE](LICENSE) and [COPYRIGHT](COPYRIGHT) for details.

This benchmark contains code compiled from the [IUPAC InChI v.1.06 Distribution](https://www.inchi-trust.org/downloads/), which is licensed under the [IUPAC/InChI Trust License](https://www.inchi-trust.org/download/106/LICENCE.pdf).
