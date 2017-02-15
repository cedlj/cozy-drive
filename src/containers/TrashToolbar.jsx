import styles from '../styles/toolbar'
import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import Menu, { MenuButton, Item } from 'react-bosonic/lib/Menu'

import { addFolder, showSelectionBar, uploadFile } from '../actions'
import { mustShowSelectionBar } from '../reducers'

const Toolbar = ({ t, error, addFolder, disableFolderCreation, isSelectionBarVisible, showSelectionBar, uploadFile }) => (
  <div className={styles['fil-toolbar-trash']} role='toolbar'>
    <button className={classNames(styles['danger-outline'], styles['coz-btn--delete'])}>
      {t('toolbar.delete_all')}
    </button>
    {false && <MenuButton>
      <button
        role='button'
        className='coz-btn coz-btn--more'
        disabled={!!error || isSelectionBarVisible}
      >
        <span className='coz-hidden'>{ t('toolbar.item_more') }</span>
      </button>
      <Menu className={styles['fil-toolbar-menu']}>
        <Item>
          <a className={styles['fil-action-upload']}>
            {t('toolbar.menu_upload')}
          </a>
        </Item>
        <Item>
          <a
            className={styles['fil-action-newfolder']}
            onClick={addFolder}
            disabled={disableFolderCreation}
          >
            {t('toolbar.menu_new_folder')}
          </a>
        </Item>
        <hr />
        <Item>
          <a className={styles['fil-action-select']} onClick={showSelectionBar}>
            {t('toolbar.menu_select')}
          </a>
        </Item>
      </Menu>
    </MenuButton>}
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  error: state.ui.error,
  isSelectionBarVisible: mustShowSelectionBar(state),
  disableFolderCreation: state.ui.disableFolderCreation
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addFolder: () => {
    dispatch(addFolder())
  },
  showSelectionBar: () => {
    dispatch(showSelectionBar())
  },
  uploadFile: (file) => {
    dispatch(uploadFile(file))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Toolbar))
