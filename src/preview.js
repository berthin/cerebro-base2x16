/**
 * Core modules
 */
import { KeyboardNav, KeyboardNavItem } from 'cerebro-ui'
import styles from './style.css'

/**
 * Main module
 */
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
