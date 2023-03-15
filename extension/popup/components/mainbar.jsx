import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Utils from '../../background/utils/utils'
import GroupNameEditor from '../../share/components/groups/GroupNameEditor'

class MainBar extends GroupNameEditor {
  constructor(props) {
    super(props)

    Object.assign(this.state, {
      maximized: false,
    })

    this.handleClickPref = this.handleClickPref.bind(this)
    this.handleCloseAllExpand = this.handleCloseAllExpand.bind(this)
    this.handleOpenAllExpand = this.handleOpenAllExpand.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
  }

  render() {
    let inside
    if (this.state.editing) {
      inside = super.render()
    } else {
      let maximizerClasses = classNames({
        "icon-maximized": !this.props.maximized,
        "icon-minimized": this.props.maximized,
        "fa-expand": !this.props.maximized,
        "fa-compress": this.props.maximized,
        "app-maximize": true,
        "fa": true,
        "fa-fw": true,
      })

      let title_expand = this.props.maximized ? browser.i18n.getMessage("reduce_menu") : browser.i18n.getMessage("expand_menu")

      let labelSynchronized = this.props.isSync
        ? browser.i18n.getMessage("to_unsynchronize_window")
        : browser.i18n.getMessage("to_synchronize_window")
      let titleSynchronized = browser.i18n.getMessage(
        (this.props.isSync ? "change_window_invisible" : "change_window_visible")
      )

      inside = [
        <div
          key="change-visibility"
          id="change-visibility"
          className={classNames({
            "grouped-button": true,
            "group-visible": !this.props.isSync,
            "incognito": this.props.isIncognito,
          })}
          onClick={this.handleCheckChange}
          title={titleSynchronized}>
          <span>{labelSynchronized}</span>
        </div>,
        <div
          className="manage-button"
          key="open-manager"
          id="open-manager"
          onClick={this.handleClickManageButton}
          title={browser.i18n.getMessage("open_manager")}>
          <i className="fa fa-fw fa-list" />
          <span>{browser.i18n.getMessage("group_manager")}</span>
        </div>,
        <div
          className="right-actions"
          key="right-actions">
          <i
            className="app-pref fa fa-fw fa-angle-double-down expand-groups"
            title={browser.i18n.getMessage("expand_all_groups")}
            onClick={this.handleOpenAllExpand}
          />
          <i
            className="app-pref fa fa-fw fa-angle-double-up reduce-groups"
            title={browser.i18n.getMessage("reduce_all_groups")}
            onClick={this.handleCloseAllExpand}
          />
          <i
            id="maximize-popup"
            className={maximizerClasses}
            title={title_expand}
            onClick={this.props.onClickMaximize}
          />
          <i
            id="open-preferences"
            className="app-pref fa fa-fw fa-gear"
            title={browser.i18n.getMessage("contextmenu_preferences")}
            onClick={this.handleClickPref}
          />
        </div>,
      ]
    }

    return (
      <li className="mainbar">
        {inside}
      </li>
    )
  }

  handleClickManageButton(event) {
    event.stopPropagation()
    Utils.openUrlOncePerWindow(browser.extension.getURL(
      "/manage/manage-groups.html"
    )).then(() => { // Let time to window to Open
      window.close()
    })
  }

  handleOpenAllExpand(event) {
    event.stopPropagation()
    this.props.handleAllChangeExpand(true)
  }

  handleCloseAllExpand(event) {
    event.stopPropagation()
    this.props.handleAllChangeExpand(false)
  }

  handleClickPref(event) {
    event.stopPropagation()
    this.props.onClickPref()
    window.close()
  }

  handleCheckChange(event) {
    event.stopPropagation()
    if (this.props.isSync) {
      this.props.onChangeWindowSync(this.props.currentWindowId, false)
    } else {
      this.setState({ editing: true })
    }
  }

  onTitleSet(event) {
    if (event) {
      event.stopPropagation()
    }
    this.props.onChangeWindowSync(this.props.currentWindowId, true, this.state.newTitle)
    this.resetButton()
  }

  handleGroupDragOver(event) {
    event.stopPropagation()
  }

  handleDragEnter(event) {
    event.stopPropagation()
  }

  handleDragLeave(event) {
    event.stopPropagation()
  }

  handleDrop(event) {
    event.stopPropagation()
  }
}

MainBar.propTypes = {
  onChangeWindowSync: PropTypes.func,
  onClickPref: PropTypes.func,
  onClickMaximize: PropTypes.func,
  isSync: PropTypes.bool,
  isIncognito: PropTypes.bool,
  currentWindowId: PropTypes.number.isRequired,
  handleAllChangeExpand: PropTypes.func,
}

export default MainBar