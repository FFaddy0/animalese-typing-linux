'use strict';
const standard = {
  1: 'Esc',

  59: 'F1',
  60: 'F2',
  61: 'F3',
  62: 'F4',
  63: 'F5',
  64: 'F6',
  65: 'F7',
  66: 'F8',
  67: 'F9',
  68: 'F10',
  87: 'F11',
  88: 'F12',

  91: 'F13',
  92: 'F14',
  93: 'F15',

  41: '`',

  2: '1',
  3: '2',
  4: '3',
  5: '4',
  6: '5',
  7: '6',
  8: '7',
  9: '8',
  10: '9',
  11: '0',

  12: '-',
  13: '=',
  14: 'Backspace',

  15: 'Tab',
  58: 'CapsLock',

  30: 'A',
  48: 'B',
  46: 'C',
  32: 'D',
  18: 'E',
  33: 'F',
  34: 'G',
  35: 'H',
  23: 'I',
  36: 'J',
  37: 'K',
  38: 'L',
  50: 'M',
  49: 'N',
  24: 'O',
  25: 'P',
  16: 'Q',
  19: 'R',
  31: 'S',
  20: 'T',
  22: 'U',
  47: 'V',
  17: 'W',
  45: 'X',
  21: 'Y',
  44: 'Z',

  26: '[',
  27: ']',
  43: '\\',

  39: ';',
  40: "'",
  28: 'Enter',

  51: ',',
  52: '.',
  53: '/',

  57: 'Space',

  3639: 'PrtSc',
  70: 'ScrLk',
  3653: 'Pause',

  3666: 'Ins',
  3667: 'Del',
  3655: 'Home',
  3663: 'End',
  3657: 'PgUp',
  3665: 'PgDn',

  57416: '↑',
  57419: '←',
  57421: '→',
  57424: '↓',

  42: 'Shift',
  54: 'Shift',
  29: 'Ctrl',
  3613: 'Ctrl',
  56: 'Alt',
  3640: 'Alt',
  3675: 'Meta',
  3676: 'Meta',
  3677: 'Menu',

  // Numpad
  69: 'Num\nLock',
  3637: '/', // Numpad
  55: '*', // Numpad
  74: '-', // Numpad
  3597: '=', // Numpad
  78: '+', // Numpad
  3612: 'Enter', // Numpad
  83: '.', // Numpad

  79: '1', // Numpad
  80: '2', // Numpad
  81: '3', // Numpad
  75: '4', // Numpad
  76: '5', // Numpad
  77: '6', // Numpad
  71: '7', // Numpad
  72: '8', // Numpad
  73: '9', // Numpad
  82: '0', // Numpad
};

const darwin = JSON.parse(JSON.stringify(standard));
Object.assign(darwin, {
  28: 'Return',
  56: 'Option',
  69: 'Clear',
  3640: 'Option',
  3666: 'Fn',
  3675: 'Command',
  3676: 'Command',
});

const win32 = JSON.parse(JSON.stringify(standard));
Object.assign(win32, {
  3675: 'Win',
  3676: 'Win',
  61010: 'Ins',
  61011: 'Del',
  60999: 'Home',
  61007: 'End',
  61001: 'PgUp',
  61009: 'PgDn',
  61000: '↑',
  61003: '←',
  61005: '→',
  61008: '↓',
});

const linux = JSON.parse(JSON.stringify(standard));

// ==================================================
// remap keycodes from standard to os based keycodes
function keycodesRemap(defines) {
  const sprite = remapper('standard', process.platform, {...defines});
  Object.keys(sprite).map((kc) => {
    sprite[`keycode-${kc}`] = sprite[kc];
    delete sprite[kc];
  });
  return sprite;
}

function keycodesFill(defines){
  let keys = {...defines};
  Object.keys(standard).map((kc) => {
    if(!keys[kc]){
      keys[kc] = null;
    }
  });
  return keys;
}

module.exports = { standard, darwin, win32, linux, keycodesRemap, keycodesFill };

function remapper(from = 'standard', to = 'darwin', defines = {}) {
  if (from == 'standard') {
    // from standard linux, darwin, win32
    switch (to) {
      case 'linux':
        break;
      case 'darwin': {
        defines['91'] = defines['3639']; // mac f13
        defines['92'] = defines['70']; // mac f14
        defines['93'] = defines['3653']; // mac f15
        defines['91'] = defines['57416'];
        defines['56'] = defines['3675'];
        defines['3675'] = defines['56'];
        defines['3675'] = defines['3640'];
        defines['56'] = defines['3676'];
        defines['29'] = defines['3613'];

        defines['3597'] = defines['69']; // numlock -> clear
        break;
      }
      case 'win32': {
        // row 2
        defines['61010'] = defines['3666'];
        defines['60999'] = defines['3655'];
        defines['61001'] = defines['3657'];
        // row 3
        defines['61011'] = defines['3667'];
        defines['61007'] = defines['3663'];
        defines['61009'] = defines['3665'];
        defines['3677'] = defines['3613'];
        // row 4
        defines['61000'] = defines['57416'];
        // row 5
        defines['61003'] = defines['57419'];
        defines['61008'] = defines['57424'];
        defines['61005'] = defines['57421'];
        break;
      }
    }
  } else {
    // from linux, darwin, win32 to standard
    switch (from) {
      case 'darwin': {
        defines['3639'] = defines['91'];
        defines['70'] = defines['92'];
        defines['3653'] = defines['93'];
        defines['3675'] = defines['56'];
        defines['56'] = defines['3675'];
        defines['3640'] = defines['3675'];
        defines['3676'] = defines['56'];
        defines['3613'] = defines['29'];
        break;
      }
      case 'win32': {
        // row 2
        defines['3666'] = defines['61010'];
        defines['3655'] = defines['60999'];
        defines['3657'] = defines['61001'];
        // row 3
        defines['3667'] = defines['61011'];
        defines['3663'] = defines['61007'];
        defines['3665'] = defines['61009'];
        // row 4
        defines['57416'] = defines['61000'];
        // row 5
        defines['57419'] = defines['61003'];
        defines['57424'] = defines['61008'];
        defines['57421'] = defines['61005'];
        break;
      }
    }
  }
  return defines;
}