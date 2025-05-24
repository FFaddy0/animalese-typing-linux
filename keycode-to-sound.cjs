'use strict';

//TODO: create a keyboard Remapper to remap keys to sounds.
const standard = {
/* Esc */           1: { key: 'Esc', sound: 'sfx.enter' },

/* F1 */            59: { key: 'F1', sound: '' },
/* F2 */            60: { key: 'F2', sound: '' },
/* F3 */            61: { key: 'F3', sound: '' },
/* F4 */            62: { key: 'F4', sound: '' },
/* F5 */            63: { key: 'F5', sound: '' },
/* F6 */            64: { key: 'F6', sound: '' },
/* F7 */            65: { key: 'F7', sound: '' },
/* F8 */            66: { key: 'F8', sound: '' },
/* F9 */            67: { key: 'F9', sound: '' },
/* F10 */           68: { key: 'F10', sound: '' },
/* F11 */           87: { key: 'F11', sound: '' },
/* F12 */           88: { key: 'F12', sound: '' },

/* F13 */           91: { key: 'F13', sound: '' },
/* F14 */           92: { key: 'F14', sound: '' },
/* F15 */           93: { key: 'F15', sound: '' },

/* ` */             41: { key: '`', sound: '', shiftKey: '~', shiftSound: 'sfx.tilde' },//TODO: add sound for 'backtick'

/* 1 */             2: { key: '1', sound: '&.sing.C4', shiftKey: '!', shiftSound: 'sfx.exclamation' },
/* 2 */             3: { key: '2', sound: '&.sing.D4', shiftKey: '@', shiftSound: 'sfx.at' },
/* 3 */             4: { key: '3', sound: '&.sing.E4', shiftKey: '#', shiftSound: 'sfx.pound' },
/* 4 */             5: { key: '4', sound: '&.sing.F4', shiftKey: '$', shiftSound: 'sfx.dollar' },
/* 5 */             6: { key: '5', sound: '&.sing.G4', shiftKey: '%', shiftSound: 'sfx.percent' },
/* 6 */             7: { key: '6', sound: '&.sing.A4', shiftKey: '^', shiftSound: 'sfx.caret' },
/* 7 */             8: { key: '7', sound: '&.sing.B4', shiftKey: '&', shiftSound: 'sfx.ampersand' },
/* 8 */             9: { key: '8', sound: '&.sing.C5', shiftKey: '*', shiftSound: 'sfx.asterisk' },
/* 9 */             10: { key: '9', sound: '&.sing.D5', shiftKey: '(', shiftSound: 'sfx.parenthesis_open' },
/* 0 */             11: { key: '0', sound: '&.sing.E5', shiftKey: ')', shiftSound: 'sfx.parenthesis_closed' },

/* - */             12: { key: '-', sound: '&.sing.F5', shiftKey: '_', shiftSound: 'sfx.default' }, //TODO: add sound for 'underscore'
/* = */             13: { key: '=', sound: '&.sing.G5', shiftKey: '+', shiftSound: 'sfx.default' }, // TODO: add sound for 'plus'
/* Backspace */     14: { key: 'Backspace', sound: 'sfx.backspace' },

/* Tab */           15: { key: 'Tab', sound: 'sfx.tab' },
/* Caps Lock */     58: { key: 'Caps Lock', sound: '' },

/* a */             30: { key: 'a', shiftKey: 'A', sound: '&.voice.a' },
/* b */             48: { key: 'b', shiftKey: 'B', sound: '&.voice.b' },
/* c */             46: { key: 'c', shiftKey: 'C', sound: '&.voice.c' },
/* d */             32: { key: 'd', shiftKey: 'D', sound: '&.voice.d' },
/* e */             18: { key: 'e', shiftKey: 'E', sound: '&.voice.e' },
/* f */             33: { key: 'f', shiftKey: 'F', sound: '&.voice.f' },
/* g */             34: { key: 'g', shiftKey: 'G', sound: '&.voice.g' },
/* h */             35: { key: 'h', shiftKey: 'H', sound: '&.voice.h' },
/* i */             23: { key: 'i', shiftKey: 'I', sound: '&.voice.i' },
/* j */             36: { key: 'j', shiftKey: 'J', sound: '&.voice.j' },
/* k */             37: { key: 'k', shiftKey: 'K', sound: '&.voice.k' },
/* l */             38: { key: 'l', shiftKey: 'L', sound: '&.voice.l' },
/* m */             50: { key: 'm', shiftKey: 'M', sound: '&.voice.m' },
/* n */             49: { key: 'n', shiftKey: 'N', sound: '&.voice.n' },
/* o */             24: { key: 'o', shiftKey: 'O', sound: '&.voice.o' },
/* p */             25: { key: 'p', shiftKey: 'P', sound: '&.voice.p' },
/* q */             16: { key: 'q', shiftKey: 'Q', sound: '&.voice.q' },
/* r */             19: { key: 'r', shiftKey: 'R', sound: '&.voice.r' },
/* s */             31: { key: 's', shiftKey: 'S', sound: '&.voice.s' },
/* t */             20: { key: 't', shiftKey: 'T', sound: '&.voice.t' },
/* u */             22: { key: 'u', shiftKey: 'U', sound: '&.voice.u' },
/* v */             47: { key: 'v', shiftKey: 'V', sound: '&.voice.v' },
/* w */             17: { key: 'w', shiftKey: 'W', sound: '&.voice.w' },
/* x */             45: { key: 'x', shiftKey: 'X', sound: '&.voice.x' },
/* y */             21: { key: 'y', shiftKey: 'Y', sound: '&.voice.y' },
/* z */             44: { key: 'z', shiftKey: 'Z', sound: '&.voice.z' },

/* [ */             26: { key: '[', sound: 'sfx.bracket_open', shiftKey: '{', shiftSound: 'sfx.brace_open' },
/* ] */             27: { key: ']', sound: 'sfx.bracket_closed', shiftKey: '}', shiftSound: 'sfx.brace_closed' },
/* \ */             43: { key: '\\', sound: 'sfx.slash_back', shiftKey: '|', shiftSound: 'sfx.default' }, //TODO: add sound for 'pipe'
/* / */             53: { key: '/', sound: 'sfx.slash_forward', shiftKey: '?', shiftSound: 'sfx.question' },

/* ; */             39: { key: ';', sound: 'sfx.default', shiftKey: ':', shiftSound: 'sfx.default' }, //TODO: add sound for 'colon'/'semicolon'
/*  */              40: { key: '\'', sound: 'sfx.default', shiftKey: '"', shiftSound: 'sfx.default' }, //TODO: add sound for 'quote'/'apostrophe'
/* Enter */         28: { key: 'Enter', sound: 'sfx.enter' },

/* , */             51: { key: ',', sound: 'sfx.default', shiftKey: '<', shiftSound: 'sfx.default' },//TODO: add sound for 'comma'/'less than'
/* . */             52: { key: '.', sound: 'sfx.default', shiftKey: '>', shiftSound: 'sfx.default' },//TODO: add sound for 'period'/'greater than'

/* Space */         57: { key: 'Space', sound: '' },

/* PrintScreen */   3639: { key: 'PrintScreen', sound: '' },
/* ScrollLock */    70: { key: 'ScrollLock', sound: '' },
/* Pause */         3653: { key: 'Pause', sound: '' },

/* Insert */        3666: { key: 'Insert', sound: '' },
/* Delete */        3667: { key: 'Delete', sound: '' },
/* Home */          3655: { key: 'Home', sound: '' },
/* End */           3663: { key: 'End', sound: '' },
/* PageUp */        3657: { key: 'PageUp', sound: '' },
/* PageDown */      3665: { key: 'PageDown', sound: '' },

/* ↑ */             57416: { key: 'Up', sound: 'sfx.arrow_up' },
/* ← */             57419: { key: 'Left', sound: 'sfx.arrow_left' },
/* → */             57421: { key: 'Right', sound: 'sfx.arrow_right' },
/* ↓ */             57424: { key: 'Down', sound: 'sfx.arrow_down' },

/* Shift */         42: { key: 'Shift', sound: '' },
/* Shift */         54: { key: 'Shift', sound: '' },
/* Ctrl */          29: { key: 'Ctrl', sound: '' },
/* Ctrl */          3613: { key: 'Ctrl', sound: '' },
/* Alt */           56: { key: 'Alt', sound: '' },
/* Alt */           3640: { key: 'Alt', sound: '' },
/* Meta */          3675: { key: 'Meta', sound: '' },
/* Meta */          3676: { key: 'Meta', sound: '' },
/* Menu */          3677: { key: 'Menu', sound: '' },

// Num
/* Num Lock */      69: { key: 'Num Lock', sound: '' },
/* Num / */         3637: { key: 'Num /', sound: '' },
/* Num * */         55: { key: 'Num *', sound: '' },
/* Num - */         74: { key: 'Num -', sound: '' },
/* Num - */         3597: { key: 'Num -', sound: '' },
/* Num + */         78: { key: 'Num +', sound: '' },
/* Num Enter */     3612: { key: 'Num Enter', sound: 'sfx.enter' },
/* Num . */         83: { key: 'Num .', sound: '' },
    
/* Num 1 */         79: { key: 'Num 1', sound: '&.sing.C4' },
/* Num 2 */         80: { key: 'Num 2', sound: '&.sing.D4' },
/* Num 3 */         81: { key: 'Num 3', sound: '&.sing.Eb4' },
/* Num 4 */         75: { key: 'Num 4', sound: '&.sing.F4' },
/* Num 5 */         76: { key: 'Num 5', sound: '&.sing.G4' },
/* Num 6 */         77: { key: 'Num 6', sound: '&.sing.Ab4' },
/* Num 7 */         71: { key: 'Num 7', sound: '&.sing.Bb4' },
/* Num 8 */         72: { key: 'Num 8', sound: '&.sing.C5' },
/* Num 9 */         73: { key: 'Num 9', sound: '&.sing.D5' },
/* Num 0 */         82: { key: 'Num 0', sound: '&.sing.Eb5' },
};

const darwin = {
/* Esc */           53: { key: 'Esc', sound: 'sfx.enter' },

/* F1 */            122: { key: 'F1', sound: '' },
/* F2 */            120: { key: 'F2', sound: '' },
/* F3 */            99: { key: 'F3', sound: '' },
/* F4 */            118: { key: 'F4', sound: '' },
/* F5 */            96: { key: 'F5', sound: '' },
/* F6 */            97: { key: 'F6', sound: '' },
/* F7 */            98: { key: 'F7', sound: '' },
/* F8 */            100: { key: 'F8', sound: '' },
/* F9 */            101: { key: 'F9', sound: '' },
/* F10 */           109: { key: 'F10', sound: '' },
/* F11 */           103: { key: 'F11', sound: '' },
/* F12 */           111: { key: 'F12', sound: '' },

/* F13 */           105: { key: 'F13', sound: '' },
/* F14 */           107: { key: 'F14', sound: '' },
/* F15 */           113: { key: 'F15', sound: '' },

/* ` */             50: { key: '`', sound: '', shiftKey: '~', shiftSound: 'sfx.tilde' },//TODO: add sound for 'backtick'

/* 1 */             18: { key: '1', sound: '&.sing.C4', shiftKey: '!', shiftSound: 'sfx.exclamation' },
/* 2 */             19: { key: '2', sound: '&.sing.D4', shiftKey: '@', shiftSound: 'sfx.at' },
/* 3 */             20: { key: '3', sound: '&.sing.E4', shiftKey: '#', shiftSound: 'sfx.pound' },
/* 4 */             21: { key: '4', sound: '&.sing.F4', shiftKey: '$', shiftSound: 'sfx.dollar' },
/* 5 */             23: { key: '5', sound: '&.sing.G4', shiftKey: '%', shiftSound: 'sfx.percent' },
/* 6 */             22: { key: '6', sound: '&.sing.A4', shiftKey: '^', shiftSound: 'sfx.caret' },
/* 7 */             26: { key: '7', sound: '&.sing.B4', shiftKey: '&', shiftSound: 'sfx.ampersand' },
/* 8 */             28: { key: '8', sound: '&.sing.C5', shiftKey: '*', shiftSound: 'sfx.asterisk' },
/* 9 */             25: { key: '9', sound: '&.sing.D5', shiftKey: '(', shiftSound: 'sfx.parenthesis_open' },
/* 0 */             29: { key: '0', sound: '&.sing.E5', shiftKey: ')', shiftSound: 'sfx.parenthesis_closed' },

/* - */             27: { key: '-', sound: '&.sing.F5', shiftKey: '_', shiftSound: 'sfx.default' }, //TODO: add sound for 'underscore'
/* = */             24: { key: '=', sound: '&.sing.G5', shiftKey: '+', shiftSound: 'sfx.default' }, // TODO: add sound for 'plus'
/* Backspace */     51: { key: 'Backspace', sound: 'sfx.backspace' },

/* Tab */           48: { key: 'Tab', sound: 'sfx.tab' },
/* Caps Lock */     57: { key: 'Caps Lock', sound: '' },

/* a */             0: { key: 'a', shiftKey: 'A', sound: '&.voice.a' },
/* b */             11: { key: 'b', shiftKey: 'B', sound: '&.voice.b' },
/* c */             8: { key: 'c', shiftKey: 'C', sound: '&.voice.c' },
/* d */             2: { key: 'd', shiftKey: 'D', sound: '&.voice.d' },
/* e */             14: { key: 'e', shiftKey: 'E', sound: '&.voice.e' },
/* f */             3: { key: 'f', shiftKey: 'F', sound: '&.voice.f' },
/* g */             5: { key: 'g', shiftKey: 'G', sound: '&.voice.g' },
/* h */             4: { key: 'h', shiftKey: 'H', sound: '&.voice.h' },
/* i */             34: { key: 'i', shiftKey: 'I', sound: '&.voice.i' },
/* j */             38: { key: 'j', shiftKey: 'J', sound: '&.voice.j' },
/* k */             40: { key: 'k', shiftKey: 'K', sound: '&.voice.k' },
/* l */             37: { key: 'l', shiftKey: 'L', sound: '&.voice.l' },
/* m */             46: { key: 'm', shiftKey: 'M', sound: '&.voice.m' },
/* n */             45: { key: 'n', shiftKey: 'N', sound: '&.voice.n' },
/* o */             31: { key: 'o', shiftKey: 'O', sound: '&.voice.o' },
/* p */             35: { key: 'p', shiftKey: 'P', sound: '&.voice.p' },
/* q */             12: { key: 'q', shiftKey: 'Q', sound: '&.voice.q' },
/* r */             15: { key: 'r', shiftKey: 'R', sound: '&.voice.r' },
/* s */             1: { key: 's', shiftKey: 'S', sound: '&.voice.s' },
/* t */             17: { key: 't', shiftKey: 'T', sound: '&.voice.t' },
/* u */             32: { key: 'u', shiftKey: 'U', sound: '&.voice.u' },
/* v */             9: { key: 'v', shiftKey: 'V', sound: '&.voice.v' },
/* w */             13: { key: 'w', shiftKey: 'W', sound: '&.voice.w' },
/* x */             7: { key: 'x', shiftKey: 'X', sound: '&.voice.x' },
/* y */             16: { key: 'y', shiftKey: 'Y', sound: '&.voice.y' },
/* z */             6: { key: 'z', shiftKey: 'Z', sound: '&.voice.z' },

/* [ */             33: { key: '[', sound: 'sfx.bracket_open', shiftKey: '{', shiftSound: 'sfx.brace_open' },
/* ] */             30: { key: ']', sound: 'sfx.bracket_closed', shiftKey: '}', shiftSound: 'sfx.brace_closed' },
/* \ */             42: { key: '\\', sound: 'sfx.slash_back', shiftKey: '|', shiftSound: 'sfx.default' }, //TODO: add sound for 'pipe'
/* / */             44: { key: '/', sound: 'sfx.slash_forward', shiftKey: '?', shiftSound: 'sfx.question' },

/* ; */             41: { key: ';', sound: 'sfx.default', shiftKey: ':', shiftSound: 'sfx.default' }, //TODO: add sound for 'colon'/'semicolon'
/*  */              39: { key: '\'', sound: 'sfx.default', shiftKey: '"', shiftSound: 'sfx.default' }, //TODO: add sound for 'quote'/'apostrophe'
/* Enter */         36: { key: 'Enter', sound: 'sfx.enter' },

/* , */             43: { key: ',', sound: 'sfx.default', shiftKey: '<', shiftSound: 'sfx.default' },//TODO: add sound for 'comma'/'less than'
/* . */             47: { key: '.', sound: 'sfx.default', shiftKey: '>', shiftSound: 'sfx.default' },//TODO: add sound for 'period'/'greater than'

/* Space */         49: { key: 'Space', sound: '' },

/* PrintScreen */   3639: { key: 'PrintScreen', sound: '' },
/* ScrollLock */    70: { key: 'ScrollLock', sound: '' },
/* Pause */         3653: { key: 'Pause', sound: '' },

/* Delete */        117: { key: 'Delete', sound: '' },
/* Home */          115: { key: 'Home', sound: '' },
/* End */           119: { key: 'End', sound: '' },
/* PageUp */        116: { key: 'PageUp', sound: '' },
/* PageDown */      121: { key: 'PageDown', sound: '' },

/* ↑ */             126: { key: 'Up', sound: 'sfx.arrow_up' },
/* ← */             123: { key: 'Left', sound: 'sfx.arrow_left' },
/* → */             124: { key: 'Right', sound: 'sfx.arrow_right' },
/* ↓ */             125: { key: 'Down', sound: 'sfx.arrow_down' },

/* Shift */         56: { key: 'Shift', sound: '' },
/* Shift */         60: { key: 'Shift', sound: '' },
/* Ctrl */          59: { key: 'Ctrl', sound: '' },
/* Ctrl */          62: { key: 'Ctrl', sound: '' },
/* Alt */           58: { key: 'Alt', sound: '' },
/* Alt */           61: { key: 'Alt', sound: '' },
/* Command */       55: { key: 'Command', sound: '' },
/* Command */       54: { key: 'Command', sound: '' },
/* F18 */           79: { key: 'Command', sound: '' },

// Num
/* Num / */         75: { key: 'Num /', sound: '' },
/* Num * */         67: { key: 'Num *', sound: '' },
/* Num - */         78: { key: 'Num -', sound: '' },
/* Num = */         81: { key: 'Num =', sound: '' },
/* Num + */         69: { key: 'Num +', sound: '' },
/* Num Enter */     76: { key: 'Num Enter', sound: 'sfx.enter' },
/* Num . */         65: { key: 'Num .', sound: '' },
    
/* Num 1 */         83: { key: 'Num 1', sound: '&.sing.C4' },
/* Num 2 */         84: { key: 'Num 2', sound: '&.sing.D4' },
/* Num 3 */         85: { key: 'Num 3', sound: '&.sing.Eb4' },
/* Num 4 */         86: { key: 'Num 4', sound: '&.sing.F4' },
/* Num 5 */         87: { key: 'Num 5', sound: '&.sing.G4' },
/* Num 6 */         88: { key: 'Num 6', sound: '&.sing.Ab4' },
/* Num 7 */         89: { key: 'Num 7', sound: '&.sing.Bb4' },
/* Num 8 */         91: { key: 'Num 8', sound: '&.sing.C5' },
/* Num 9 */         92: { key: 'Num 9', sound: '&.sing.D5' },
/* Num 0 */         82: { key: 'Num 0', sound: '&.sing.Eb5' },
};

const win32 = JSON.parse(JSON.stringify(standard));
Object.assign(win32, {
  /* Win */         3675: { key: 'Win', sound: '' },
  /* Win */         3676: { key: 'Win', sound: '' },
  /* Insert */      61010: { key: 'Insert', sound: '' },
  /* Delete */      61011: { key: 'Delete', sound: '' },
  /* Home */        60999: { key: 'Home', sound: '' },
  /* End */         61007: { key: 'End', sound: '' },
  /* PageUp */      61001: { key: 'PageUp', sound: '' },
  /* PageDown */    61009: { key: 'PageDown', sound: '' },
  /* ↑ */           61000: { key: 'Up', sound: 'sfx.arrow_up' },
  /* ← */           61003: { key: 'Left', sound: 'sfx.arrow_left' },
  /* → */           61005: { key: 'Right', sound: 'sfx.arrow_right' },
  /* ↓ */           61008: { key: 'Down', sound: 'sfx.arrow_down' },
});

const linux = JSON.parse(JSON.stringify(standard));

module.exports = { standard, darwin, win32, linux };
