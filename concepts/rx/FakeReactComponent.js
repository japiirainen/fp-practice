import { timer } from 'rxjs'
import { existingTaskCompleted, newTaskStarted } from './TaskProggressService'

const someTask = timer(3000)
const otherTask = timer(6000)

const doWork = () => {
  newTaskStarted()
  someTask.subscribe(() => {
    existingTaskCompleted()
  })
}
const doLongWork = () => {
  otherTask.subscribe(() => {
    existingTaskCompleted()
  })
}

// with promises

const doVeryQuickWork = () => {
  newTaskStarted()
  new Promise(resolve => {
    setTimeout(() => {
      existingTaskCompleted()
      resolve()
    }, 300)
  })
}

const notSoQuickWork = () => {
  newTaskStarted()
  new Promise(resolve => {
    setTimeout(() => {
      existingTaskCompleted()
      resolve()
    }, 2200)
  })
}
