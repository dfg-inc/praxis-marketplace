#!/usr/bin/env node
// Self-contained praxis-ba CLI (canon-graph bundled; no node_modules needed).
import(require('node:url').pathToFileURL(require('node:path').join(__dirname, 'praxis-ba.bundle.mjs')).href).catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
