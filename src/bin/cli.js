#!/usr/bin/env node

const system_profiler = require('../index.js')

system_profiler(process.argv[2])
  .then(data => process.stdout.write(JSON.stringify(data, null, 2)))
  .catch(err => process.stderr.write(err))
