/**
 * NAMMA TULUNADU - TULUSIRI TULU TRANSLITERATOR ENGINE
 * Rule-Based Kannada to Authentic Tulu-Tigalari Script Engine
 * Fully verified and aligned with Tulunada Mahathme & Classical Tulu Linguistics.
 */

export const TULUSIRI = {
  // Independent Vowels
  VOWELS: {
    'ಅ': 'XAA', 'ಆ': 'XAa', 'ಇ': 'XAi', 'ಈ': 'XAI', 'ಉ': 'XAu',
    'ಊ': 'XAU', 'ಋ': 'XAR', 'ಌ': 'ಌ', 'ಎ': 'eA', 'ಏ': 'EA',
    'ಐ': 'eeA', 'ಒ': 'eAa', 'ಓ': 'FAa', 'ಔ': 'XAY'
  },

  // Consonants
  CONSONANTS: {
    'ಕ': 'k',  'ಖ': 'K',  'ಗ': 'g',  'ಘ': 'G',  'ಙ': 'Z',
    'ಚ': 'c',  'ಛ': 'C',  'ಜ': 'j',  'ಝ': 'J',  'ಞ': 'z',
    'ಟ': 'q',  'ಠ': 'Q',  'ಡ': 'w',  'ಢ': 'W',  'ಣ': 'N',
    'ತ': 't',  'ಥ': 'T',  'ದ': 'd',  'ಧ': 'D',  'ನ': 'n',
    'ಪ': 'p',  'ಫ': 'P',  'ಬ': 'b',  'ಭ': 'B',  'ಮ': 'm',
    'ಯ': 'y',  'ರ': 'r',  'ಱ': 'xxrhaxx', 'ಲ': 'l', 'ವ': 'v',
    'ಶ': 'S',  'ಷ': 'x',  'ಸ': 's',  'ಹ': 'Xh', 'ಳ': 'L'
  },

  // Kannada Numerals
  DIGITS: {
    '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4',
    '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9'
  },

  // Romanized Pronunciation Maps (IAST)
  ROMAN: {
    'ಅ': 'a', 'ಆ': 'ā', 'ಇ': 'i', 'ಈ': 'ī', 'ಉ': 'u', 'ಊ': 'ū', 'ಋ': 'ṛ',
    'ಎ': 'e', 'ಏ': 'ē', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'ō', 'ಔ': 'au',
    'ಂ': 'ṃ', 'ಃ': 'ḥ',
    'ಕ': 'ka', 'ಖ': 'kha', 'ಗ': 'ga', 'ಘ': 'gha', 'ಙ': 'ṅa',
    'ಚ': 'ca', 'ಛ': 'cha', 'ಜ': 'ja', 'ಝ': 'jha', 'ಞ': 'ña',
    'ಟ': 'ṭa', 'ಠ': 'ṭha', 'ಡ': 'ḍa', 'ಢ': 'ḍha', 'ಣ': 'ṇa',
    'ತ': 'ta', 'ಥ': 'tha', 'ದ': 'da', 'ಧ': 'dha', 'ನ': 'na',
    'ಪ': 'pa', 'ಫ': 'pha', 'ಬ': 'ba', 'ಭ': 'bha', 'ಮ': 'ma',
    'ಯ': 'ya', 'ರ': 'ra', 'ಱ': 'ṟa', 'ಲ': 'la', 'ವ': 'va',
    'ಶ': 'śa', 'ಷ': 'ṣa', 'ಸ': 'sa', 'ಹ': 'ha', 'ಳ': 'ḷa',
    'ಾ': 'ā', 'ಿ': 'i', 'ೀ': 'ī', 'ು': 'u', 'ೂ': 'ū', 'ೃ': 'ṛ',
    'ೆ': 'e', 'ೇ': 'ē', 'ೈ': 'ai', 'ೊ': 'o', 'ೋ': 'ō', 'ೌ': 'au'
  },

  transliterate(input, enableSpecial = true) {
    if (!input || typeof input !== 'string') return '';
    let output = '';
    const len = input.length;
    let i = 0;

    while (i < len) {
      const ch = input[i];

      // Zero-Width Non-Joiner (ZWNJ) maps to 'X', ZWJ maps to empty
      if (ch === '\u200C') {
        output += 'X';
        i++;
        continue;
      }
      if (ch === '\u200D') {
        i++;
        continue;
      }

      // Numerals
      if (this.DIGITS[ch]) {
        output += this.DIGITS[ch];
        i++;
        continue;
      }

      // Independent Vowels
      if (this.VOWELS[ch]) {
        let vOut = this.VOWELS[ch];
        i++;
        if (i < len && input[i] === 'ಂ') {
          vOut += 'M';
          i++;
        } else if (i < len && input[i] === 'ಃ') {
          vOut += 'H';
          i++;
        }
        output += vOut;
        continue;
      }

      // Consonants & Syllable Clusters
      if (this.CONSONANTS[ch]) {
        if (ch === 'ಶ' && input.slice(i, i + 4) === 'ಶ್ರೀ') {
          output += 'SArXI';
          i += 4;
          continue;
        }

        let hasRepha = false;
        if (ch === 'ರ' && (i + 1 < len) && input[i + 1] === '್') {
          if (i + 2 < len && this.CONSONANTS[input[i + 2]] && input[i + 2] !== '್') {
            hasRepha = true;
            i += 2;
          }
        }

        const baseChar = input[i];
        if (!this.CONSONANTS[baseChar]) {
          output += (hasRepha ? 'rA' : '') + (baseChar || '');
          i++;
          continue;
        }

        const baseGlyph = this.CONSONANTS[baseChar];
        i++;

        // Subjoined Consonants (್ + C)
        const subjoined = [];
        while (i + 1 < len && input[i] === '್' && this.CONSONANTS[input[i + 1]]) {
          if (input[i + 1] === '*') break;
          subjoined.push(this.CONSONANTS[input[i + 1]]);
          i += 2;
        }

        let prefix = '';
        let suffix = '';

        if (i < len) {
          const m = input[i];
          const hasStar = (i + 1 < len && input[i + 1] === '*');

          if (m === '್') {
            if (hasStar) {
              suffix = 'A*';
              i += 2;
            } else {
              suffix = 'A';
              i++;
            }
          } else if (m === 'ಾ') {
            suffix = 'a';
            i++;
          } else if (m === 'ಿ') {
            suffix = 'i';
            i++;
          } else if (m === 'ೀ') {
            suffix = 'I';
            i++;
          } else if (m === 'ು') {
            if (hasStar) {
              suffix = enableSpecial ? 'uAX' : 'u*';
              i += 2;
            } else {
              suffix = 'u';
              i++;
            }
          } else if (m === 'ೂ') {
            suffix = 'U';
            i++;
          } else if (m === 'ೃ') {
            suffix = 'R';
            i++;
          } else if (m === 'ೆ') {
            if (hasStar) {
              if (enableSpecial) {
                prefix = 'o';
                i += 2;
              } else {
                prefix = 'e';
                suffix = '*';
                i += 2;
              }
            } else {
              prefix = 'e';
              i++;
            }
          } else if (m === 'ೇ') {
            prefix = 'E';
            i++;
          } else if (m === 'ೈ') {
            prefix = 'ee';
            i++;
          } else if (m === 'ೊ') {
            prefix = 'e';
            suffix = 'a';
            i++;
          } else if (m === 'ೋ') {
            prefix = 'F';
            suffix = 'a';
            i++;
          } else if (m === 'ೌ') {
            suffix = 'Y';
            i++;
          } else if (hasStar) {
            suffix = '*';
            i++;
          }
        }

        if (i < len && input[i] === 'ಂ') {
          suffix += 'M';
          i++;
        } else if (i < len && input[i] === 'ಃ') {
          suffix += 'H';
          i++;
        }

        let core = baseGlyph;
        for (const sub of subjoined) {
          core += 'A' + sub;
        }
        if (hasRepha) {
          core += 'f';
        }

        output += prefix + core + suffix;
        continue;
      }

      if (ch === 'ಂ') {
        output += 'M';
        i++;
      } else if (ch === 'ಃ') {
        output += 'H';
        i++;
      } else if (ch === '್') {
        if (i + 1 < len && input[i + 1] === '*') {
          output += 'A*';
          i += 2;
        } else {
          output += 'A';
          i++;
        }
      } else if (ch === 'ು' && i + 1 < len && input[i + 1] === '*') {
        output += enableSpecial ? 'uAX' : 'u*';
        i += 2;
      } else {
        output += ch;
        i++;
      }
    }

    return output;
  },

  toRoman(input, enableSpecial = true) {
    if (!input) return '';
    let result = '';
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      const next = (i + 1 < input.length) ? input[i + 1] : '';

      if (enableSpecial && next === '*') {
        if (ch === 'ು' || ch === 'u') { result += 'ŭ'; i++; continue; }
        if (ch === 'ೆ' || ch === 'e') { result += 'ĕ'; i++; continue; }
        if (ch === '್') { result += '\u02BE'; i++; continue; }
      }

      if (this.CONSONANTS[ch]) {
        const matras = ['ಾ','ಿ','ೀ','ು','ೂ','ೃ','ೆ','ೇ','ೈ','ೊ','ೋ','ೌ','್'];
        if (matras.includes(next)) {
          result += (this.ROMAN[ch] || ch).slice(0, -1);
        } else {
          result += (this.ROMAN[ch] || ch);
        }
      } else if (this.ROMAN[ch]) {
        if (ch !== '್') result += this.ROMAN[ch];
      } else {
        result += ch;
      }
    }
    return result;
  }
};
