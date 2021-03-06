import React, { Component } from 'react'
import classNames from 'classnames'
import { Overlay } from 'cozy-ui/transpiled/react'

import styles from 'components/Menu/index.styl'

export const Item = ({ children, onClick }) => (
  <div onClick={onClick} className={styles['coz-menu-item']}>
    {children}
  </div>
)

export default class Menu extends Component {
  state = { opened: false }

  toggle = () => (this.state.opened ? this.close() : this.open())

  handleSelect = () => {
    this.close()
  }

  open = () => {
    this.setState({ opened: true })
  }

  close = () => {
    this.setState({ opened: false })
  }

  renderItems() {
    return React.Children.map(this.props.children, item => {
      if (!item) return item
      //if the Item is wrapped in an HOC we should provide a type props
      if ((item.props && item.props.type === 'hr') || item.type === 'hr') {
        return item
      }

      return <div onClick={this.handleSelect}>{item}</div>
    })
  }

  render() {
    const {
      title,
      disabled,
      className,
      innerClassName,
      button,
      buttonClassName
    } = this.props
    const { opened } = this.state
    return (
      <div className={classNames(styles['coz-menu'], className)}>
        {button &&
          React.cloneElement(button, { disabled, onClick: this.toggle })}
        {!button && (
          <button
            role="button"
            className={buttonClassName || styles['c-btn']}
            disabled={disabled}
            onClick={this.toggle}
          >
            {title}
          </button>
        )}
        {opened && (
          <Overlay
            onClick={this.close}
            onEscape={this.close}
            className={styles['cozy-menu-overlay']}
          />
        )}
        <div
          data-test-id="coz-menu-inner"
          className={classNames(styles['coz-menu-inner'], innerClassName, {
            [styles['coz-menu-inner--opened']]: opened
          })}
        >
          {this.renderItems()}
        </div>
      </div>
    )
  }
}
