
export interface AudioPlayerFactoryProps {
   audio: HTMLAudioElement;
   sources: string[];
   currentIndex: number;
   currentTime: number;
   volume: number;
   play: () => void;
   pause: () => void;
   seekTo: (val: number) => void;
   setVolume: (val: number) => void;
   setIndex: (index: number) => void;
   getState: () => { index: number; playedTime: number };
   clear: () => void;
}


const Factory = new Map<string, AudioPlayerFactoryProps>()


export interface AudioPlayerOptions {
   sources: string[];
   onLoad?: () => void;
   onFinish?: () => void;
}

export const getAudioPlayer = (id: string | number) => Factory.get("_" + id)

const AudioPlayer = (_id: string | number, options: AudioPlayerOptions) => {
   let id = "_" + _id
   const item = Factory.has(id)
   if (!item) {
      Factory.set(id, {
         audio: new Audio,
         volume: 1,
         sources: options.sources,
         currentIndex: 0,
         currentTime: 0,
         play: () => {
            if (!options.sources.length) {
               return
            }
            const fac = Factory.get(id) as AudioPlayerFactoryProps
            const { audio, sources, currentIndex, currentTime, volume } = fac
            const src = sources[currentIndex]
            if (src) {
               audio.src = src
               audio.volume = volume
               audio.load()
               audio.onloadedmetadata = () => {
                  audio.currentTime = currentTime
                  audio.play()
               }
               audio.ontimeupdate = () => {
                  Factory.set(id, { ...fac, currentTime: audio.currentTime })
               }
               audio.onended = () => {
                  Factory.set(id, { ...fac, currentIndex: currentIndex + 1 })
                  fac.play()
               }
            } else {
               options.onFinish && options.onFinish()
            }
         },
         pause: () => {
            const { audio } = Factory.get(id) as AudioPlayerFactoryProps
            audio.pause()
         },
         seekTo: (val: number) => {
            const fac = Factory.get(id) as AudioPlayerFactoryProps
            Factory.set(id, { ...fac, currentTime: val })
         },
         setVolume: (vol: number) => {
            const fac = Factory.get(id) as AudioPlayerFactoryProps
            fac.audio.volume = vol
            Factory.set(id, {
               ...fac,
               volume: vol
            })
         },
         setIndex: (index: number) => {
            const fac = Factory.get(id) as AudioPlayerFactoryProps
            Factory.set(id, { ...fac, currentIndex: index })
         },
         getState: () => {
            const { audio, currentIndex } = Factory.get(id) as AudioPlayerFactoryProps
            return {
               index: currentIndex,
               playedTime: audio.currentTime
            }
         },
         clear: () => {
            const { audio } = Factory.get(id) as AudioPlayerFactoryProps
            audio.pause()
            Factory.delete(id)
         }
      })
   }

   return Factory.get(id) as AudioPlayerFactoryProps
}

export default AudioPlayer