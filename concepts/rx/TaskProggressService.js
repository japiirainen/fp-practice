import { Observable, merge, Subject } from 'rxjs'
import {
  mapTo,
  startWith,
  distinctUntilChanged,
  shareReplay,
  filter,
  pairwise,
  switchMap,
  takeUntil,
} from 'rxjs/operators'
/*
How do we count?
    start from zero
    when async task starts, increase the count by 1
    when a task ends, decrease the count by 1
*/

const taskStart = new Subject()
const taskCompletions = new Subject()
const showSpinner = new Observable()

export function newTaskStarted() {
  taskStart.next()
}
export function existingTaskCompleted() {
  taskCompletions.next()
}

const loadUp = taskStart.pipe(mapTo(1))
const loadDown = taskCompletions.pipe(mapTo(-1))

const loadVariations = merge(loadUp, loadDown)

const currentLoadCount = loadVariations.pipe(
  startWith(0),
  scan((acc, x) => {
    const newLoad = acc + x
    return newLoad < 0 ? 0 : newLoad
  }),
  distinctUntilChanged(),
  shareReplay({ bufferSize: 1, refCount: true })
)

/*
When does the loader need to hid?

When the count of async tasks goes to 0
*/

const shouldHideSpinner = currentLoadCount.pipe(filter(count => count === 0))

const shouldShowSpinner = currentLoadCount.pipe(
  pairwise(),
  filer(([prevCount, currCount]) => prevCount === 0 && currCount === 1)
)

/*
When the spinner needs to show
    -> show the spinner ...until it's time to hide it
*/

shouldShowSpinner.pipe(switchMap(() => showSpinner.pipe(takeUntil(shouldHideSpinner)))).subscribe()

export default {}
