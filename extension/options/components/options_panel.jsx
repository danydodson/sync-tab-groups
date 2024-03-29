import React from 'react'
import PropTypes from 'prop-types'

import SettingsSection from './section_settings'
import ShortcutsSection from './section_shortcuts'
import InterfaceSection from './section_interface'
import SaveSection from './section_save'
import AboutSection from './section_about'

class OptionsPanel extends React.Component {
  render() {
    return (
      <div id="panel">
        <SettingsSection
          options={this.props.options}
          onOptionChange={this.props.onOptionChange}
          selected={this.props.selected}
          onUndiscardLazyTabs={this.props.onUndiscardLazyTabs}
          onCloseAllHiddenTabs={this.props.onCloseAllHiddenTabs}
          downloadErrorLog={this.props.downloadErrorLog}
        />
        <ShortcutsSection
          options={this.props.options} onOptionChange={this.props.onOptionChange}
          selected={this.props.selected} />
        <InterfaceSection
          options={this.props.options} onOptionChange={this.props.onOptionChange}
          selected={this.props.selected} />
        <SaveSection
          options={this.props.options} onOptionChange={this.props.onOptionChange}
          onImportClick={this.props.onImportClick}
          onExportClick={this.props.onExportClick}
          onDeleteAllGroups={this.props.onDeleteAllGroups}
          onReloadGroups={this.props.onReloadGroups}
          selected={this.props.selected}
          onRemoveBackUp={this.props.onRemoveBackUp}
          onImportBackUp={this.props.onImportBackUp}
          onExportBackUp={this.props.onExportBackUp}
          /* TODO: end of bookmark auto-save
         onBackUpClick: this.props.onBackUpClick*//>
        <AboutSection
          selected={this.props.selected} />
      </div>
    )
  }
}

OptionsPanel.propTypes = {
  onOptionChange: PropTypes.func,
  onBackUpClick: PropTypes.func,
  onImportClick: PropTypes.func,
  onExportClick: PropTypes.func,
  onDeleteAllGroups: PropTypes.func,
  onReloadGroups: PropTypes.func,
  selected: PropTypes.string,
}

export default OptionsPanel