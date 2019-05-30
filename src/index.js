'use strict';

/**
 * Core modules
 */
import Preview from './preview.js'
import iconPath from './icon128.png'

/**
 * Variables used on cerebro to export the plugin
 */

const id = 'base2x16'
export const icon = iconPath
export const keyword = 'base2x16'

/**
 * Variables used in this module
 */

const NUMBER_REGEXP = /^(\d+)?(0x[\da-fA-F]+)?(0b[01]+)?$/

/**
 * Class definition
 */
class BaseConverter {

    constructor(number) {
        const match = number.match(NUMBER_REGEXP);
        if (!match) throw new Error(number + ' not a number')

        if (match[3] != undefined) {
            this.number_base10 = parseInt(number.substring(2), 2);
        }
        else {
            this.number_base10 = parseInt(number); 
        }
    }

    get hex() {
        return '0x' + this.number_base10.toString(16).toUpperCase();
    }

    get dec() {
        return this.number_base10.toString();
    }

    get bin() {
        return '0b' + this.number_base10.toString(2);
    }
}

/**
 * Plugin
 */
export const fn = ({term, display, actions}) => {
  try {
    let number = new BaseConverter(term);

    const numbers = {
      dec: number.dec,
      hex: number.hex,
      bin: number.bin,
    }

    display({
      id: id,
      icon: icon,
      title: `Conversion for ${term}`,
      getPreview: () => <Preview number={ numbers } actions={ actions } />
    });
  } catch (e) {
    // provided string cannot be parsed as integer
    // do-nothing
  }
};
