const { info, log } = require('module');
const My = require('./moduleClass');

global.a = 5;

info('name');
log('name');

const my = new My('My');

my.info('class');
my.log('class');
