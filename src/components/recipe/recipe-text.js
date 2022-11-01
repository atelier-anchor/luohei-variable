import { randomChar } from '@/utils'

export const recipeText = {
  'zh-hans': {
    a: [
      '天上取样人间织，染作江南春水色。',
      '春江潮水连海平，海上明月共潮生。',
      'Ad astra abyssosque!',
    ],
    b: ['面向动态图形的中文可变字体「络黑」（LuoHei Variable），设计于2020\u{2013}2022年间。'],
    c: ['个风我酬意警鹰纛\u{30EDD}', 'Fox nymphs grab quick-jived waltz.', 'e = 2.718281828459…'],
  },
  'zh-hant': {
    a: [
      '天上取樣人間織，染作江南春水色。',
      '春江潮水連海平，海上明月共潮生。',
      'Ad astra abyssosque!',
    ],
    b: ['面向動態圖形的中文可變字型「絡黑」（LuoHei Variable），設計於2020\u{2013}2022年間。'],
    c: ['个東我意酬書鬱鷹\u{30EDE}', 'Fox nymphs grab quick-jived waltz.', 'e = 2.718281828459…'],
  },
}

export const spacingValues = (isHorizontal) => {
  const horizontalValue = (val) => (isHorizontal ? val : '0em')
  return {
    comma: {
      'zh-hans': { full: ['0em', '0.5em'] },
      'zh-hant': { full: ['0.25em', '0.25em'] },
    },
    fullstop: {
      'zh-hans': { kaiming: ['0em', '0.5em'], full: ['0em', '0.5em'] },
      'zh-hant': { kaiming: ['0.25em', '0.25em'], full: ['0.25em', '0.25em'] },
    },
    colon: {
      'zh-hans': { full: horizontalValue(['0em', '0.5em']) },
      'zh-hant': { full: horizontalValue(['0.25em', '0.25em']) },
    },
    divide: {
      'zh-hans': {
        kaiming: horizontalValue(['0em', '0.5em']),
        full: horizontalValue(['0em', '0.5em']),
      },
      'zh-hant': {
        kaiming: horizontalValue(['0.25em', '0.25em']),
        full: horizontalValue(['0.25em', '0.25em']),
      },
    },
    open: {
      'zh-hans': { full: ['0.5em', '0em'] },
      'zh-hant': { full: ['0.5em', '0em'] },
    },
    close: {
      'zh-hans': { full: ['0em', '0.5em'] },
      'zh-hant': { full: ['0em', '0.5em'] },
    },
  }
}

export const kerningValues = (isHorizontal) => {
  return {
    'colon-close': {
      'zh-hans': { full: isHorizontal ? '0.5em' : '0.25em' },
      'zh-hant': { full: '0.25em' },
    },
    'divide-close': {
      'zh-hans': {
        kaiming: isHorizontal ? '0.5em' : '0.25em',
        full: isHorizontal ? '0.5em' : '0.25em',
      },
      'zh-hant': { kaiming: '0.25em', full: '0.25em' },
    },
  }
}

export const glueValues = (isHorizontal) => ({
  cjkLatin: { kaiming: 'calc(1em / 6)', full: 'calc(1em / 6)' },
  latinCjk: {
    kaiming: isHorizontal ? 'calc(1em / 6)' : '0.25em',
    full: isHorizontal ? 'calc(1em / 6)' : '0.25em',
  },
})

export const randomText = {
  parNum: 2,
  sentenceNum: 4,
  sentenceMinLen: 5,
  sentenceMaxLen: 15,
  quoteProb: 0.2,
  quoteTypesProb: [0.6, 0.8, 1.0],
  wordProb: 0.2,
  wordMaxNum: 2,
  puncts: '，，，，。。。：；；！？'.split(''), // Manually set the weights of different puncts
  quotes: ['「」', '『』', '（）'],
  // prettier-ignore
  words:
    ['Alex','and','AX','bad','bawds','baz','bed','big','blew','blow','blowzy','blue','bold','box','brave','brawny','brick','bright','brown','by','charged','chumps','cozy','daft','DJs','dog','dogs','dozy','driven','exchanged','fax','few','fight','five','flax','flick','flock','flummoxed','fog','fop','for','fowl','fowls','fox','fun','galvanized','game','gazed','get','ghost','gods','grab','graced','help','how','in','Iraq','is','Jack','Jay','jeopardy','jigs','Jim','jinx','jived','joaquin','job','jocks','jodhpurs','jog','jolt','jug','jump','jumping','jumps','jumpy','junk','jury','just','kvetching','lazy','luck','might','milk','mock','MTV','my','now','Nymph','nymphs','of','over','phoenix','pig','pled','prog','PyJamas','quack','quacking','quart','quartz','quick','quickly','quips','quiz','red','silk','sphinx','the','to','trebek','TV','two','veldt','very','vex','vexing','vixens','wafting','waltz','was','watch','waves','wax','Whangs','whelps','when','wizard','wolves','woven','zaps','zebra','zebras','zephyrs','zippy'],
  getQuotes() {
    const p = Math.random()
    if (p <= this.quoteTypesProb[0]) return this.quotes[0]
    if (p <= this.quoteTypesProb[1]) return this.quotes[1]
    return this.quotes[2]
  },
  insertQuotes(s) {
    if (Math.random() > this.quoteProb) return s
    const a = Math.floor(Math.random() * (s.length - 1))
    const b = Math.floor(Math.random() * (s.length - a)) + a + 1
    const quotes = this.getQuotes()
    return s.slice(0, a) + quotes[0] + s.slice(a, b) + quotes[1] + s.slice(b)
  },
  insertWords(s) {
    const words = [...Array(this.wordMaxNum)]
      .map(() =>
        Math.random() < this.wordProb
          ? this.words[Math.floor(Math.random() * this.words.length, this.words.length)]
          : undefined
      )
      .filter((e) => e)
    const pos = [...Array(words.length)]
      .map(() => Math.floor(Math.random() * s.length))
      .sort((a, b) => b - a)
    for (let i = 0; i < pos.length; i++) {
      s = s.slice(0, pos[i]) + `~${words[i]}~` + s.slice(pos[i])
    }
    return s.replace(/~~/g, '-').replace(/~/g, '') // Add hyphens for successive words
  },
  generateSentence(locale) {
    const len = Math.floor(Math.random() * this.sentenceMaxLen) + this.sentenceMinLen
    const sentence = [...Array(len).keys()].map(() => randomChar(locale)).join('')
    const punct = this.puncts[Math.floor(Math.random() * this.puncts.length)]
    return this.insertWords(this.insertQuotes(sentence)) + punct
  },
  generatePar(locale) {
    return [...Array(this.sentenceNum).keys()]
      .map(() => this.generateSentence(locale))
      .join('')
      .replace(/.$/g, '。')
      .replace(/(^|[。！？])[「『（]?\w/g, (s) => s.toUpperCase())
  },
  generate(locale) {
    return [...Array(this.parNum).keys()].map(() => this.generatePar(locale))
  },
}
