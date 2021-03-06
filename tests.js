var os = require('os');
var fs = require('fs');
var sudo = require('./');
var exec = require('child_process').exec;

function kill(end) {
  exec('sudo -k', end);
}
function icns() {
  if (process.platform !== 'darwin') return undefined;
  var path = '/Applications/Chess.app/Contents/Resources/Chess.icns';
  try {
    fs.statSync(path);
    return path;
  } catch (error) {}
  return undefined;
}
kill(
  function() {
    var options = {
      icns: icns(),
      name: 'Chess'
    };
    console.log('sudo.exec("echo hello", ' + JSON.stringify(options) + ')');
    sudo.exec('echo hello', options,
      function(error, stdout, stderr) {
        console.log('error: ' + error);
        console.log('stdout: ' + JSON.stringify(stdout));
        console.log('stderr: ' + JSON.stringify(stderr));
        kill(
          function() {
            var crlf = os.platform() == 'win32' ? '\r\n' : '\n';
            if (error) throw error;
            if (stdout !== ('hello' + crlf)) throw new Error('stdout != "hello' + crlf + '"');
            if (stderr !== "") throw new Error('stderr != ""');
            console.log('OK');
          }
        );
      }
    );
  }
);
