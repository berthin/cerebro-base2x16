import React, { Component, PropTypes } from 'react'
import { KeyboardNav, KeyboardNavItem } from 'cerebro-ui'
import styles from './style.css'

export default ({ number, actions }) => (
  <div className={styles.wrapper}>
    <KeyboardNav>
      {Object.keys(number).map(code => (
        <KeyboardNavItem
          key={code}
          onSelect={() => {actions.copyToClipboard(number[code]); actions.hideWindow()} }
        >
            { number[code] }
        </KeyboardNavItem>
      ))}
    </KeyboardNav>
  </div>
)
