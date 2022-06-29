/*

MAC
smb://servername/MLS/Timbers/IrrefutableProofTimbersAreBestTeamInMLS.pdf

WINDOWS
\\servername\MLS\Timbers\IrrefutableProofTimbersAreBestTeamInMLS.pdf

*/

const fdSlash = new RegExp('/', 'gi');
const bkSlash = new RegExp('\\\\', 'gi');
const prefix = 'smb:';

const form = document.getElementById('form');
const output = document.getElementById('output');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const [text, mtw_rad, wtm_rad] = e.target;
  let result;
  let replacement;

  // MAC -> WINDOWS
  // all '/' get replaced by '\'
  // remove 'smb:' prefix
  if (mtw_rad.checked) {
    replacement = '\\';
    result = text.value.replace(fdSlash, replacement);
    result = result.replace(prefix, '');
    output.textContent = result;
  }

  // WINDOWS -> MAC
  // all '\' get replaced by '/'
  // prepend 'smb:' prefix
  if (wtm_rad.checked) {
    replacement = '/';
    result = 'smb:'.concat(text.value.replace(bkSlash, replacement));
    output.textContent = result;
  }
});
