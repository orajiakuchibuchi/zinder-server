import fs from 'fs';

import path from "path";
const DBPATH= '/records.json';
import fileDirName from '../file-dir-name.mjs';

const { __dirname } = fileDirName(import.meta);
const DB = fs.readFileSync(path.join(__dirname + DBPATH));


export default DB;