'use strict';

/**
 * Core modules
 */
//const React = require('react')
//const Preview = require('./preview.js')
import React from 'react'
import Preview from './preview'

/**
 * Variables used on cerebro
 */
//const icon = require('./icon128.png')
import icon from './icon128.png'

export const name = 'Convert numbers to hex, bin, and dec.'

/**
 * Variables used by this module
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
 * Function called by cerebro
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
      icon,
      title: `Conversion for number ${term}`,
      getPreview: () => (
        <Preview number={ numbers } actions={ actions } />
      )
    });
  } catch (e) {
    // provided string cannot be parsed as integer
    // do-nothing
  }
};
