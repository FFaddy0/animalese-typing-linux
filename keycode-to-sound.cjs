'use strict';

const platforms = {
  win32: 0,
  darwin: 1,
  linux: 2,
};

const keyDefinitions = [
  // Numbers
  { keycodes: [49, 18, null], key: '1', sound: '%.60', ctrlSound:'%.61', shiftSound: '&.gwah' },
  { keycodes: [50, 19, null], key: '2', sound: '%.62', ctrlSound:'%.63', shiftSound: 'sfx.at' },
  { keycodes: [51, 20, null], key: '3', sound: '%.64', ctrlSound:'%.65', shiftSound: 'sfx.pound' },
  { keycodes: [52, 21, null], key: '4', sound: '%.65', ctrlSound:'%.66', shiftSound: 'sfx.dollar' },
  { keycodes: [53, 23, null], key: '5', sound: '%.67', ctrlSound:'%.68', shiftSound: 'sfx.percent' },
  { keycodes: [54, 22, null], key: '6', sound: '%.69', ctrlSound:'%.70', shiftSound: 'sfx.caret' },
  { keycodes: [55, 26, null], key: '7', sound: '%.71', ctrlSound:'%.72', shiftSound: 'sfx.ampersand' },
  { keycodes: [56, 28, null], key: '8', sound: '%.72', ctrlSound:'%.73', shiftSound: 'sfx.asterisk' },
  { keycodes: [57, 25, null], key: '9', sound: '%.74', ctrlSound:'%.75', shiftSound: 'sfx.parenthesis_open' },
  { keycodes: [48, 29, null], key: '0', sound: '%.76', ctrlSound:'%.77', shiftSound: 'sfx.parenthesis_closed' },
  // Letters
  { keycodes: [65, 0, null], key: 'a', sound: '&.a', ctrlSound: 'sfx.parenthesis_open' },
  { keycodes: [66, 11, null], key: 'b', sound: '&.b' },
  { keycodes: [67, 8, null], key: 'c', sound: '&.c', ctrlSound: 'sfx.slash_forward' },
  { keycodes: [68, 2, null], key: 'd', sound: '&.d' },
  { keycodes: [69, 14, null], key: 'e', sound: '&.e' },
  { keycodes: [70, 3, null], key: 'f', sound: '&.f' },
  { keycodes: [71, 5, null], key: 'g', sound: '&.g' },
  { keycodes: [72, 4, null], key: 'h', sound: '&.h' },
  { keycodes: [73, 34, null], key: 'i', sound: '&.i' },
  { keycodes: [74, 38, null], key: 'j', sound: '&.j' },
  { keycodes: [75, 40, null], key: 'k', sound: '&.k' },
  { keycodes: [76, 37, null], key: 'l', sound: '&.l' },
  { keycodes: [77, 46, null], key: 'm', sound: '&.m' },
  { keycodes: [78, 45, null], key: 'n', sound: '&.n' },
  { keycodes: [79, 31, null], key: 'o', sound: '&.o' },
  { keycodes: [80, 35, null], key: 'p', sound: '&.p' },
  { keycodes: [81, 12, null], key: 'q', sound: '&.q' },
  { keycodes: [82, 15, null], key: 'r', sound: '&.r' },
  { keycodes: [83, 1, null], key: 's', sound: '&.s', ctrlSound: 'sfx.asterisk' },
  { keycodes: [84, 17, null], key: 't', sound: '&.t' },
  { keycodes: [85, 32, null], key: 'u', sound: '&.u' },
  { keycodes: [86, 9, null], key: 'v', sound: '&.v', ctrlSound: 'sfx.pound' },
  { keycodes: [87, 13, null], key: 'w', sound: '&.w' },
  { keycodes: [88, 7, null], key: 'x', sound: '&.x', ctrlSound: 'sfx.at' },
  { keycodes: [89, 16, null], key: 'y', sound: '&.y', ctrlSound: 'sfx.ampersand' },
  { keycodes: [90, 6, null], key: 'z', sound: '&.z', ctrlSound: 'sfx.ampersand' },
  // Function Keys
  { keycodes: [112, 122, null], key: 'F1'},
  { keycodes: [113, 120, null], key: 'F2'},
  { keycodes: [114, 99, null], key: 'F3'},
  { keycodes: [115, 118, null], key: 'F4'},
  { keycodes: [116, 96, null], key: 'F5'},
  { keycodes: [117, 97, null], key: 'F6'},
  { keycodes: [118, 98, null], key: 'F7'},
  { keycodes: [119, 100, null], key: 'F8'},
  { keycodes: [120, 101, null], key: 'F9'},
  { keycodes: [121, 109, null], key: 'F10'},
  { keycodes: [122, 103, null], key: 'F11'},
  { keycodes: [123, 111, null], key: 'F12'},
  { keycodes: [124, 105, null], key: 'F13'},
  { keycodes: [125, 107, null], key: 'F14'},
  { keycodes: [126, 113, null], key: 'F15'},
  // Special Keys and Characters
  { keycodes: [27, 53, null], key: 'Esc', sound: 'sfx.enter' },
  { keycodes: [9, 48, null], key: 'Tab', sound: 'sfx.tab' },
  { keycodes: [20, 57, null], key: 'Caps Lock'},
  { keycodes: [192, 50, null], key: '`', sound: '%.55', shiftSound: 'sfx.tilde' },
  { keycodes: [189, 27, null], key: '-', sound: '%.77', ctrlSound:'%.78', shiftSound: 'sfx.default' },
  { keycodes: [187, 24, null], key: '=', sound: '%.79', ctrlSound:'%.80', shiftSound: 'sfx.default' },
  { keycodes: [219, 33, null], key: '[', sound: 'sfx.bracket_open', shiftSound: 'sfx.brace_open' },
  { keycodes: [221, 30, null], key: ']', sound: 'sfx.bracket_closed', shiftSound: 'sfx.brace_closed' },
  { keycodes: [220, 42, null], key: '\\', sound: 'sfx.slash_back', shiftSound: 'sfx.default' },
  { keycodes: [191, 44, null], key: '/', sound: 'sfx.slash_forward', shiftSound: '&.deska' },
  { keycodes: [186, 41, null], key: ';', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [222, 39, null], key: '\'', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [188, 43, null], key: ',', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [190, 47, null], key: '.', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [13, 36, null], key: 'Enter', sound: 'sfx.enter' },
  { keycodes: [8, 51, null], key: 'Backspace', sound: 'sfx.backspace' },
  { keycodes: [32, 49, null], key: 'Space'},
  // Navigation Keys
  { keycodes: [45, null, null], key: 'Insert'},
  { keycodes: [46, 51, null], key: 'Delete', sound: 'sfx.at' },
  { keycodes: [36, 115, null], key: 'Home'},
  { keycodes: [35, 119, null], key: 'End'},
  { keycodes: [33, 116, null], key: 'PageUp'},
  { keycodes: [34, 121, null], key: 'PageDown'},
  { keycodes: [38, 126, null], key: 'Up', sound: 'sfx.arrow_up' },
  { keycodes: [37, 123, null], key: 'Left', sound: 'sfx.arrow_left' },
  { keycodes: [39, 124, null], key: 'Right', sound: 'sfx.arrow_right' },
  { keycodes: [40, 125, null], key: 'Down', sound: 'sfx.arrow_down' },
  // Modifier Keys
  { keycodes: [160, 56, null], key: 'Shift'}, // Left Shift
  { keycodes: [161, 60, null], key: 'Shift'}, // Right Shift
  { keycodes: [162, 59, null], key: 'Ctrl'}, // Left Ctrl
  { keycodes: [163, 62, null], key: 'Ctrl'}, // Right Ctrl
  { keycodes: [164, 58, null], key: 'Alt'}, // Left Alt
  { keycodes: [165, 61, null], key: 'Alt'}, // Right Alt
  { keycodes: [91, 55, null], key: 'Meta'}, // Left Meta (Win/Cmd)
  { keycodes: [92, 54, null], key: 'Meta'}, // Right Meta (Win/Cmd)
  { keycodes: [93, null, null], key: 'Menu'},
  // Numpad Keys
  { keycodes: [144, 71, null], key: 'Num Lock'},
  { keycodes: [111, 75, null], key: 'Num /', sound: 'sfx.slash_forward' },
  { keycodes: [106, 67, null], key: 'Num *', sound: 'sfx.asterisk' },
  { keycodes: [109, 78, null], key: 'Num -'},
  { keycodes: [107, 69, null], key: 'Num +'},
  { keycodes: [13, 76, null], key: 'Num Enter', sound: 'sfx.enter' },
  { keycodes: [110, 65, null], key: 'Num .', sound: 'sfx.default' },
  { keycodes: [96, 82, null], key: 'Num 0', sound: '%.58' },
  { keycodes: [97, 83, null], key: 'Num 1', sound: '%.60' },
  { keycodes: [98, 84, null], key: 'Num 2', sound: '%.62' },
  { keycodes: [99, 85, null], key: 'Num 3', sound: '%.63' },
  { keycodes: [100, 86, null], key: 'Num 4', sound: '%.65' },
  { keycodes: [101, 87, null], key: 'Num 5', sound: '%.67' },
  { keycodes: [102, 88, null], key: 'Num 6', sound: '%.68' },
  { keycodes: [103, 89, null], key: 'Num 7', sound: '%.70' },
  { keycodes: [104, 91, null], key: 'Num 8', sound: '%.72' },
  { keycodes: [105, 92, null], key: 'Num 9', sound: '%.74' },
  // Media Keys
  { keycodes: [173, null, null], key: 'Vol Mute' },
  { keycodes: [174, null, null], key: 'Vol Down' },
  { keycodes: [175, null, null], key: 'Vol Up' },
  { keycodes: [176, null, null], key: 'Next'},
  { keycodes: [177, null, null], key: 'Prev'},
  { keycodes: [179, null, null], key: 'Play' },
  // Other
  { keycodes: [145, null, null], key: 'Scroll Lock'},
  { keycodes: [19, null, null], key: 'Pause'},
  { keycodes: [44, null, null], key: 'Print Screen'},
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
      sound: def.sound ?? '',
      shiftSound: def.shiftSound ?? undefined,
      ctrlSound: def.ctrlSound ?? undefined,
      altSound: def.altSound ?? undefined,
    };
  }
  return map;
}

module.exports = {
  win32: buildKeyMap('win32'),
  darwin: buildKeyMap('darwin'),
  linux: buildKeyMap('linux'),
};