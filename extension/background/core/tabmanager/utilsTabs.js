import Utils from '../../utils/utils'
import TAB_CONSTANTS from '../../core/TAB_CONSTANTS'

// Return with all standard tab information
// Id are Index are set once in a group (see GroupManager.prepareGroups)
function getTabFactory(tab) {
  return Object.assign({
    title: "New Tab",
    url: TAB_CONSTANTS.NEW_TAB,
    favIconUrl: "chrome://branding/content/icon32.png",
    hidden: false,
    lastAccessed: 0,
    pinned: false,
    windowId: browser.windows.WINDOW_ID_NONE,
    discarded: false,
  }, tab)
}

/**
 * Count the number of pinned tabs in tabs
 * @param {Array<Tab>} tabs - tabs
 * @returns {number} - nbr of pinned tabs
 */
function countPinnedTabs(tabs) {
  return tabs.filter(tab => tab.pinned).length
}

/**
 * Take an index and return the value for
 *   pinned tabs are always before normal tabs
 *   normal tabs are always after pinned tabs
 *   -1 value is replaced with the real last index value
 * @param {number} index - index where to go
 * @param {Tab} tab - tab related
 * @param {Array<Tab>} tabs - targeted tabs
 * @returns {number} secureIndex
 */
function secureIndex(index, tab, tabs) {
  let realIndex = index
  let pinnedTabsCount = countPinnedTabs(tabs)
  if (tab.pinned) { // Pinned tabs are in targeted position and at least just behind last pinned tab
    realIndex = (realIndex > pinnedTabsCount || realIndex === -1)
      ? pinnedTabsCount
      : realIndex
  } else { // Normal tabs are in targeted position and never before pinned tabs
    realIndex = (realIndex < pinnedTabsCount && realIndex > -1)
      ? pinnedTabsCount
      : realIndex
  }
  realIndex = (realIndex === -1)
    ? tabs.length
    : realIndex
  return realIndex
}


/**
 * Return true if tabs were closed in the waiting time.
 */
async function waitTabsToBeClosed(tabsIdsToRemove, {
  maxLoop = 20,
  waitPerLoop = 50, //ms
} = {}) {
  if (!Array.isArray(tabsIdsToRemove)) {
    tabsIdsToRemove = [tabsIdsToRemove]
  }

  for (let i = 0; i < maxLoop; i++) {
    await Utils.wait(waitPerLoop)

    const stillOpen = await Promise.all(
      tabsIdsToRemove.map(async (id) => {
        try {
          await browser.tabs.get(id)
          return true
        } catch (e) {
          return false
        }
      }))

    if (stillOpen.filter(i => i).length === 0) {
      return true
    }
  }
  return false
}

export {
  getTabFactory,
  secureIndex,
  waitTabsToBeClosed,
  countPinnedTabs,
}