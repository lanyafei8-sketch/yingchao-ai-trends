const fs = require('node:fs');
const path = require('node:path');

const appPath = path.join(__dirname, 'app.js');
const notesPath = path.join(__dirname, 'story-notes.js');
const begin = '// BEGIN GENERATED STORY NOTES\n';
const end = '// END GENERATED STORY NOTES\n';
let app = fs.readFileSync(appPath, 'utf8');
if (app.startsWith(begin)) {
  const last = app.indexOf(end);
  if (last === -1) throw new Error('Story notes marker is incomplete.');
  app = app.slice(last + end.length);
}
const notes = fs.readFileSync(notesPath, 'utf8');
fs.writeFileSync(appPath, begin + notes + '\n' + end + app, 'utf8');
console.log('Story notes bundled into app.js');
