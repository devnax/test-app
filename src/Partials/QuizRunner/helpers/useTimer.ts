import { useMemo, useState } from 'react'
import parseMS, { TimeComponents } from 'parse-ms';

type Milliseconds = number
export interface TimeProps extends TimeComponents {
   time: string;
}

export interface TimerProps {
   interval: any;
   invalid: boolean;
   times: TimesStackProps;
   started: boolean;
   dispatch: () => void;
   start: () => void;
   stop: () => void;
   getTime: () => TimesStackProps;
   clear: () => void;
   seekTo: (milliseconds: number) => void;
}

const Factory = new Map<string, TimerProps>()


export interface TimesStackProps {
   currentTime: TimeProps;
   initialTime: TimeProps;
   offsetTime: TimeProps
}

export interface Options {
   onStart?: (props: TimesStackProps) => void;
   onStop?: (props: TimesStackProps) => void;
   onFinish?: (props: TimesStackProps) => void;
   onTick?: (props: TimesStackProps) => void;
}

const pad = (num: number) => num.toString().padStart(2, '0')
const msToTime = (ms: number) => {
   const parse = parseMS(ms)
   return {
      ...parse,
      milliseconds: ms,
      time: pad(parse.hours) + ':' + pad(parse.minutes) + ':' + pad(parse.seconds)
   }
}


export const getTimer = (id: string | number) => Factory.get(`_${id}`)

const useTimer = (id: string | number, time?: Milliseconds, options?: Options) => {
   let _id = `_${id}`
   const [, dispatch] = useState(0)


   const assign = () => {
      const invalid = !time
      const initialTime = msToTime(time || 0)
      Factory.set(_id, {
         interval: null,
         invalid,
         times: {
            initialTime: initialTime,
            currentTime: initialTime,
            offsetTime: initialTime
         },
         started: false,
         dispatch: () => dispatch(Math.random()),
         start: () => {
            if (invalid) return

            const item = Factory.get(_id)
            if (item && !item?.started) {
               Factory.set(_id, {
                  ...item,
                  started: true,
                  interval: setInterval(() => {
                     const _item = Factory.get(_id) as TimerProps
                     const times = _item.times
                     const currentTime = msToTime(times.currentTime.milliseconds - 1000)
                     const offsetTime = msToTime(times.initialTime.milliseconds - currentTime.milliseconds)
                     Factory.set(_id, {
                        ..._item,
                        times: {
                           ...times,
                           currentTime,
                           offsetTime
                        }
                     })

                     if (currentTime.milliseconds <= 0) {
                        clearInterval(_item.interval)
                        options?.onFinish && options.onFinish({
                           ...times,
                           currentTime,
                           offsetTime
                        })
                     }
                     options?.onTick && options.onTick({
                        ...times,
                        currentTime,
                        offsetTime
                     })
                     _item.dispatch()
                  }, 1000)
               })
               const _item = Factory.get(_id) as TimerProps
               options?.onStart && options.onStart(_item.times)
            }
         },
         stop: () => {
            const item = Factory.get(_id)
            if (item && item.started) {
               const times = item.times
               clearInterval(item.interval)
               options?.onStop && options.onStop(times)
               Factory.set(_id, {
                  ...item,
                  started: false,
                  interval: null
               })
            }
         },
         clear: () => Factory.delete(_id),
         getTime: () => {
            const item = Factory.get(_id) as TimerProps
            return item.times
         },
         seekTo: (milliseconds: number) => {
            const timer = Factory.get(_id)
            if (timer) {
               const times = timer.times
               const currentTime = msToTime(milliseconds)
               const offsetTime = msToTime(times.initialTime.milliseconds - currentTime.milliseconds)
               Factory.set(_id, {
                  ...timer,
                  times: {
                     ...times,
                     currentTime,
                     offsetTime
                  }
               })
            }
         }
      })
   }

   return useMemo(() => {
      const exists = Factory.get(_id)
      if (!exists) {
         assign()
      } else {
         if (exists.invalid) {
            assign()
         }
      }

      return Factory.get(_id) as TimerProps
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [time])

}

export default useTimer