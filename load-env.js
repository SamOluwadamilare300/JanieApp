require('dotenv').config();
const { execSync } = require('child_process');

const command = process.argv.slice(2).join(' ');
execSync(command, { stdio: 'inherit' });