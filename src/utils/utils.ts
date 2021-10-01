import throttle from 'lodash/throttle'
import { EVENTS } from 'griffith'

const createGroupedLogger = (label = 'Log', wait = 100) => {
    const logs: any[] = []
    const flush = throttle(() => {
        console.groupCollapsed?.(`[Click to expand]: ${label}, ${logs.length} logs`)
        let log
        while ((log = logs.shift())) {
            console.info(...log)
        }
        console.groupEnd?.()
    }, wait)
    return (...args: any) => {
        logs.push(args)
        flush()
    }
}

const groupedLogger = createGroupedLogger('TIMEUPDATE', 2000)

export const logEvent = (e: unknown, data: unknown) => {
    const args = ['onEvent', e, data]
    if (e === EVENTS.DOM.TIMEUPDATE) {
        let rrr:any=(data)
        localStorage.setItem("runningTime",rrr?.currentTime)
        groupedLogger(...args)
    } else {
        console.log(...args)
    }
}

export const getPlot = (plot: string) => {
    const sentences = (plot.match(/\S.*?\."?(?=\s|$)/g) || []);
    return (sentences.length > 0) ? sentences[0] + (sentences[1] ? sentences[1] : '') : plot
};