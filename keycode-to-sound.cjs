'use strict';

const platforms = {
  win32: 0,
  darwin: 1,
  linux: 2,
};

const keyDefinitions = [
  { keycodes: [49, 18, null], key: '1', sound: '&.sing.C4', shiftSound: 'sfx.exclamation' },
  { keycodes: [50, 19, null], key: '2', sound: '&.sing.D4', shiftSound: 'sfx.at' },
  { keycodes: [51, 20, null], key: '3', sound: '&.sing.E4', shiftSound: 'sfx.pound' },
  { keycodes: [52, 21, null], key: '4', sound: '&.sing.F4', shiftSound: 'sfx.dollar' },
  { keycodes: [53, 23, null], key: '5', sound: '&.sing.G4', shiftSound: 'sfx.percent' },
  { keycodes: [54, 22, null], key: '6', sound: '&.sing.A4', shiftSound: 'sfx.caret' },
  { keycodes: [55, 26, null], key: '7', sound: '&.sing.B4', shiftSound: 'sfx.ampersand' },
  { keycodes: [56, 28, null], key: '8', sound: '&.sing.C5', shiftSound: 'sfx.asterisk' },
  { keycodes: [57, 25, null], key: '9', sound: '&.sing.D5', shiftSound: 'sfx.parenthesis_open' },
  { keycodes: [48, 29, null], key: '0', sound: '&.sing.E5', shiftSound: 'sfx.parenthesis_closed' },
  //Letters
  { keycodes: [65, 0, null], key: 'a', sound: '&.voice.a', ctrlSound: 'sfx.parenthesis_open' },
  { keycodes: [66, 11, null], key: 'b', sound: '&.voice.b' },
  { keycodes: [67, 8, null], key: 'c', sound: '&.voice.c', ctrlSound: 'sfx.slash_forward' },
  { keycodes: [68, 2, null], key: 'd', sound: '&.voice.d' },
  { keycodes: [69, 14, null], key: 'e', sound: '&.voice.e' },
  { keycodes: [70, 3, null], key: 'f', sound: '&.voice.f' },
  { keycodes: [71, 5, null], key: 'g', sound: '&.voice.g' },
  { keycodes: [72, 4, null], key: 'h', sound: '&.voice.h' },
  { keycodes: [73, 34, null], key: 'i', sound: '&.voice.i' },
  { keycodes: [74, 38, null], key: 'j', sound: '&.voice.j' },
  { keycodes: [75, 40, null], key: 'k', sound: '&.voice.k' },
  { keycodes: [76, 37, null], key: 'l', sound: '&.voice.l' },
  { keycodes: [77, 46, null], key: 'm', sound: '&.voice.m' },
  { keycodes: [78, 45, null], key: 'n', sound: '&.voice.n' },
  { keycodes: [79, 31, null], key: 'o', sound: '&.voice.o' },
  { keycodes: [80, 35, null], key: 'p', sound: '&.voice.p' },
  { keycodes: [81, 12, null], key: 'q', sound: '&.voice.q' },
  { keycodes: [82, 15, null], key: 'r', sound: '&.voice.r' },
  { keycodes: [83, 1, null], key: 's', sound: '&.voice.s', ctrlSound: 'sfx.asterisk' },
  { keycodes: [84, 17, null], key: 't', sound: '&.voice.t' },
  { keycodes: [85, 32, null], key: 'u', sound: '&.voice.u' },
  { keycodes: [86, 9, null], key: 'v', sound: '&.voice.v', ctrlSound: 'sfx.pound' },
  { keycodes: [87, 13, null], key: 'w', sound: '&.voice.w' },
  { keycodes: [88, 7, null], key: 'x', sound: '&.voice.x', ctrlSound: 'sfx.at' },
  { keycodes: [89, 16, null], key: 'y', sound: '&.voice.y', ctrlSound: 'sfx.ampersand' },
  { keycodes: [90, 6, null], key: 'z', sound: '&.voice.z', ctrlSound: 'sfx.ampersand' },
  // Function Keys
  { keycodes: [112, 122, null], key: 'F1', sound: '' },
  { keycodes: [113, 120, null], key: 'F2', sound: '' },
  { keycodes: [114, 99, null], key: 'F3', sound: '' },
  { keycodes: [115, 118, null], key: 'F4', sound: '' },
  { keycodes: [116, 96, null], key: 'F5', sound: '' },
  { keycodes: [117, 97, null], key: 'F6', sound: '' },
  { keycodes: [118, 98, null], key: 'F7', sound: '' },
  { keycodes: [119, 100, null], key: 'F8', sound: '' },
  { keycodes: [120, 101, null], key: 'F9', sound: '' },
  { keycodes: [121, 109, null], key: 'F10', sound: '' },
  { keycodes: [122, 103, null], key: 'F11', sound: '' },
  { keycodes: [123, 111, null], key: 'F12', sound: '' },
  { keycodes: [124, 105, null], key: 'F13', sound: '' },
  { keycodes: [125, 107, null], key: 'F14', sound: '' },
  { keycodes: [126, 113, null], key: 'F15', sound: '' },
  // Special Keys and Characters
  { keycodes: [27, 53, null], key: 'Esc', sound: 'sfx.enter' },
  { keycodes: [9, 48, null], key: 'Tab', sound: 'sfx.tab' },
  { keycodes: [20, 57, null], key: 'Caps Lock', sound: '' },
  { keycodes: [192, 50, null], key: '`', sound: '', shiftSound: 'sfx.tilde' },
  { keycodes: [189, 27, null], key: '-', sound: '&.sing.F5', shiftSound: 'sfx.default' },
  { keycodes: [187, 24, null], key: '=', sound: '&.sing.G5', shiftSound: 'sfx.default' },
  { keycodes: [219, 33, null], key: '[', sound: 'sfx.bracket_open', shiftSound: 'sfx.brace_open' },
  { keycodes: [221, 30, null], key: ']', sound: 'sfx.bracket_closed', shiftSound: 'sfx.brace_closed' },
  { keycodes: [220, 42, null], key: '\\', sound: 'sfx.slash_back', shiftSound: 'sfx.default' },
  { keycodes: [191, 44, null], key: '/', sound: 'sfx.slash_forward', shiftSound: 'sfx.question' },
  { keycodes: [186, 41, null], key: ';', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [222, 39, null], key: '\'', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [188, 43, null], key: ',', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [190, 47, null], key: '.', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [13, 36, null], key: 'Enter', sound: 'sfx.enter' },
  { keycodes: [8, 51, null], key: 'Backspace', sound: 'sfx.backspace' },
  { keycodes: [32, 49, null], key: 'Space', sound: '' },
  // Navigation Keys
  { keycodes: [45, null, null], key: 'Insert', sound: '' },
  { keycodes: [46, 51, null], key: 'Delete', sound: '' },
  { keycodes: [36, 115, null], key: 'Home', sound: '' },
  { keycodes: [35, 119, null], key: 'End', sound: '' },
  { keycodes: [33, 116, null], key: 'PageUp', sound: '' },
  { keycodes: [34, 121, null], key: 'PageDown', sound: '' },
  { keycodes: [38, 126, null], key: 'Up', sound: 'sfx.arrow_up' },
  { keycodes: [37, 123, null], key: 'Left', sound: 'sfx.arrow_left' },
  { keycodes: [39, 124, null], key: 'Right', sound: 'sfx.arrow_right' },
  { keycodes: [40, 125, null], key: 'Down', sound: 'sfx.arrow_down' },
  // Modifier Keys
  { keycodes: [160, 56, null], key: 'Shift', sound: '' }, // Left Shift
  { keycodes: [161, 60, null], key: 'Shift', sound: '' }, // Right Shift
  { keycodes: [162, 59, null], key: 'Ctrl', sound: '' }, // Left Ctrl
  { keycodes: [163, 62, null], key: 'Ctrl', sound: '' }, // Right Ctrl
  { keycodes: [164, 58, null], key: 'Alt', sound: '' }, // Left Alt
  { keycodes: [165, 61, null], key: 'Alt', sound: '' }, // Right Alt
  { keycodes: [91, 55, null], key: 'Meta', sound: '' }, // Left Meta (Win/Cmd)
  { keycodes: [92, 54, null], key: 'Meta', sound: '' }, // Right Meta (Win/Cmd)
  { keycodes: [93, null, null], key: 'Menu', sound: '' },
  // Numpad Keys
  { keycodes: [144, 71, null], key: 'Num Lock', sound: '' },
  { keycodes: [111, 75, null], key: 'Num /', sound: 'sfx.slash_forward' },
  { keycodes: [106, 67, null], key: 'Num *', sound: 'sfx.asterisk' },
  { keycodes: [109, 78, null], key: 'Num -', sound: '' },
  { keycodes: [107, 69, null], key: 'Num +', sound: '' },
  { keycodes: [13, 76, null], key: 'Num Enter', sound: 'sfx.enter' },
  { keycodes: [110, 65, null], key: 'Num .', sound: 'sfx.default' },
  { keycodes: [96, 82, null], key: 'Num 0', sound: '&.sing.Eb5' },
  { keycodes: [97, 83, null], key: 'Num 1', sound: '&.sing.C4' },
  { keycodes: [98, 84, null], key: 'Num 2', sound: '&.sing.D4' },
  { keycodes: [99, 85, null], key: 'Num 3', sound: '&.sing.Eb4' },
  { keycodes: [100, 86, null], key: 'Num 4', sound: '&.sing.F4' },
  { keycodes: [101, 87, null], key: 'Num 5', sound: '&.sing.G4' },
  { keycodes: [102, 88, null], key: 'Num 6', sound: '&.sing.Ab4' },
  { keycodes: [103, 89, null], key: 'Num 7', sound: '&.sing.Bb4' },
  { keycodes: [104, 91, null], key: 'Num 8', sound: '&.sing.C5' },
  { keycodes: [105, 92, null], key: 'Num 9', sound: '&.sing.D5' },
];

function buildKeyMap(platform) {
  const platformIdx = platforms[platform];
  if (platformIdx === undefined) throw new Error(`Unsupported platform: ${platform}`);

  const map = {};
  for (const def of keyDefinitions) {
    const code = def.keycodes[platformIdx];
    if (code == null) continue;

    map[code] = {
      key: def.key,
      sound: def.sound,
      shiftSound: def.shiftSound,
      ctrlSound: def.ctrlSound,
    };
  }
  return map;
}

module.exports = {
  win32: buildKeyMap('win32'),
  darwin: buildKeyMap('darwin'),
  linux: buildKeyMap('linux'),
};