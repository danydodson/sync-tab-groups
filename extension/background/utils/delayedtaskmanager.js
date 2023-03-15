/**
 * Class for managing a delayed task.
 * Allow to cancel a pending task and do it immediately
 * Task is done after the delay, if a task is asked
     again, the previous one is canceled and replaced
 *
 * Don't use refId if single task (default: 0)
 */
import TASKMANAGER_CONSTANTS from './TASKMANAGER_CONSTANTS'

const DelayedTaskManager = function (timeoutDelay = 10000) {
  this.delayedTasks = {}
  this.timeoutDelay = timeoutDelay
}

// In object: {actionRef: {id: timeoutfunction} }

/**
 * Manage all the process of adding, removing or forcing a delayed taskRef
 * @param {string} taskAction - ASK, CANCEL or FORCE
 * @param {Function} delayedFunction - the delayed function to execute (without parameter)
 * @param {number} refId - ref inside the action group
 */
DelayedTaskManager.prototype.manage = async function (taskAction, delayedFunction, refId = 0) {
  switch (taskAction) {
    case TASKMANAGER_CONSTANTS.ASK:
      this.add(delayedFunction,
        refId)
      break
    case TASKMANAGER_CONSTANTS.CANCEL:
      this.remove(refId)
      break
    case TASKMANAGER_CONSTANTS.FORCE:
      this.remove(refId)
      await delayedFunction()
      break
  }
}

/**
* Add a delayed task for an a action with a specific id.
Task is done after the delay, if a task is asked
    again, the previous one is canceled and replaced
 * @param {Function} delayedFunction - the delayed function to execute (without parameter)
 * @param {number} refId (default:0) - ref inside the action group
 */
DelayedTaskManager.prototype.add = async function (delayedFunction, refId = 0) {

  // Already a task; remove it
  this.remove(refId)

  this.delayedTasks[refId] = setTimeout(async () => {
    await delayedFunction()
    this.remove(refId)
  }, this.timeoutDelay)

}

/**
 * If a task already exists, it is aborted.
 * @param {number} refId (default:0) - ref inside the action group
 */
DelayedTaskManager.prototype.remove = function (refId = 0) {
  if (this.delayedTasks[refId] !== undefined) {
    clearTimeout(this.delayedTasks[refId])
    delete (this.delayedTasks[refId])
    this.queuing = false
  }
}

export default DelayedTaskManager