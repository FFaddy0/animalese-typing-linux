const fs = require('fs');
const path = require('path');

let translations = {}; // current selected language
// default translations
const defaultTranslations = 
    JSON.parse(fs.readFileSync(path.join(__dirname, 'assets', 'lang', `en.json`), 'utf8'));


// load a language
function loadLanguage(lang = 'en') {
    const langFilePath = path.join(__dirname, 'assets', 'lang', `${lang}.json`);
    if (fs.existsSync(langFilePath)) {
        translations = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
    } else {
        console.error(`Language file for "${lang}" not found.`);
        translations = {};
    }
}
loadLanguage();

// get translation
function translate(key) { return translations[key] || (defaultTranslations[key] || `${key}`); }

// update translations for all elements on the document
function updateHtmlDocumentTranslations() {
    document.querySelectorAll('[translation]').forEach(el => {
        const key = el.getAttribute('translation');
        if (key) {
            if (el.type === 'text') el.setAttribute('placeholder', translate(key))
            else if (el.type === 'button') el.setAttribute('value', translate(key))
            else el.innerHTML = translate(key);
        }
    });
}

module.exports = {
    loadLanguage,
    updateHtmlDocumentTranslations
};