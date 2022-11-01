const LUOHEI_CHARS = {
  'zh-hans':
    '上不丙业东两个中乙书于产人今仓以任传位体作值全共关击划刘创动化十南占印反发取变可叶号叽同后向启品四国图土坞型声复夜大天始字学定家宽对导小山工差己师平年库应度开式录形念态恢意感我或技护持排控播支文新方於无日明春显更曾最月朝木本术机杜染标样格横正此比毕水永汉江济海涟源漪潮点然版王生用田由甲画白的目直看示祥空笔粗纛纤纪细织络维网置耳育自色花草行观警计认设访谨距转过这连逆速造酬里重量钦锚闭问间院随面页项风鹰黎黑默',
  'zh-hant':
    '上不丙中乙于人今以任位体作倉個值儲全兩共划創劉動化十南占印反取可同后向品問啟嘰四圖土型塢复夜大天始字學定家寬導小山工差己師平年度庫式形後念恢意感態應我或技持排控播擊支數文新方於日明春更書曾最月朝木本机杜東染格業標樣機橫欽正此比水永江海源漢漣漪潮濟無然版王生產用田由甲畢畫發白的目直看示祥空筆粗紀級細絡維網織纖纛网置耳聲育自色花草行裡觀計訪設認謹警護變距逆這速造連酬里重量錨閉開間關院隨面頁項順預顯體鬱鷹黎黑默點',
}

const LUOHEI_NAMED_INSTANCES = {
  thin: {
    none: { xwgt: 200, ywgt: 200 },
    normal: { xwgt: 100, ywgt: 300 },
    reverse: { xwgt: 300, ywgt: 100 },
  },
  light: {
    none: { xwgt: 300, ywgt: 300 },
    normal: { xwgt: 200, ywgt: 400 },
    reverse: { xwgt: 400, ywgt: 200 },
  },
  medium: {
    none: { xwgt: 450, ywgt: 450 },
    normal: { xwgt: 300, ywgt: 600 },
    reverse: { xwgt: 600, ywgt: 300 },
  },
  bold: {
    none: { xwgt: 600, ywgt: 600 },
    normal: { xwgt: 450, ywgt: 750 },
    reverse: { xwgt: 750, ywgt: 450 },
  },
  heavy: {
    none: { xwgt: 800, ywgt: 800 },
    normal: { xwgt: 600, ywgt: 900 },
    reverse: { xwgt: 900, ywgt: 600 },
  },
}

export const LUOHEI_WEIGHTS = Object.keys(LUOHEI_NAMED_INSTANCES)
export const LUOHEI_CONTRASTS = Object.keys(LUOHEI_NAMED_INSTANCES.thin)

export const HEADER_HEIGHT = 56

/**
 * @param {string} locale
 * @param {boolean} excludeSimple
 */
export const randomChar = (locale, excludeSimple = false) => {
  const chars = LUOHEI_CHARS[locale] + (excludeSimple ? '' : '一二三')
  return chars[Math.floor(Math.random() * chars.length)]
}

/**
 * @param {string} weight
 * @param {string} contrast
 */
export const namedInstance = (weight, contrast) => LUOHEI_NAMED_INSTANCES[weight][contrast]

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export const scale = (value, min = 100, max = 900) => Math.round(value * (max - min) + min)

/**
 * @param {number} n
 * @param {number} k
 * @param {number} min
 * @param {number} max
 */
export const expScale = (n, k, min = 100, max = 900) =>
  [...Array(n).keys()].map((i) =>
    Math.round(((Math.exp(k * i) - 1) / (Math.exp(k * n - k) - 1)) * (max - min) + min)
  )

/**
 * @param {string} str
 */
export const cjkKern = (str) => {
  const charPattern = '[\\w\\u4e00-\\u9fff]'
  const spanPattern = `<span class='[\\w\\s-]*'>${charPattern}<\/span>`
  const span = (className, text) => `<span class='${className}'>${text}</span>`
  const puncts = {
    comma: '，',
    fullstop: '。',
    colon: '：；',
    divide: '！？',
    open: '「『（',
    close: '」』）',
  }
  const kerns = [
    {
      // Single punctuations
      keys: Object.keys(puncts),
      searchFunc: (punct) => `(${charPattern})([${punct}])(?=${charPattern}|${spanPattern})`,
      replaceFunc: (name) => span(`p-before-${name}`, '$1') + span(`p-${name}`, '$2'),
    },
    {
      // Punctuations at the end of a line
      keys: ['fullstop', 'divide', 'open'],
      searchFunc: (punct) => `(${charPattern})([${punct}])$`,
      replaceFunc: (name) => span(`p-before-${name}`, '$1') + span(`p-${name}`, '$2'),
    },
    {
      // Punctuations before an open bracket
      keys: ['comma', 'fullstop', 'colon', 'divide', 'open', 'close'],
      searchFunc: (punct) => `(${charPattern})([${punct}])(?=[${puncts.open}])`,
      replaceFunc: (name) => span(`p-before-${name}`, '$1') + span(`p-${name}`, '$2'),
    },
    {
      // Punctuations before a close bracket
      keys: ['comma', 'fullstop', 'colon', 'divide', 'close'],
      searchFunc: (punct) => `(${charPattern})([${punct}])([${puncts.close}])`,
      replaceFunc: (name) =>
        span(`p-before-${name}`, '$1') +
        span(`p-${name}-before-close`, '$2') +
        span('p-close', '$3'),
    },
    {
      // Punctuations after a close bracket
      keys: ['comma', 'fullstop', 'colon', 'divide'],
      searchFunc: (punct) => `(${charPattern})([${puncts.close}])([${punct}])`,
      replaceFunc: (name) =>
        span('p-before-close', '$1') +
        span(`p-close-before-${name}`, '$2') +
        span(`p-${name}`, '$3'),
    },
    {
      // Punctuations after a close bracket, at the beginning of a line
      keys: ['comma', 'fullstop', 'colon', 'divide'],
      searchFunc: (punct) => `^([${puncts.close}])([${punct}])`,
      replaceFunc: (name) => span(`p-close-before-${name}`, '$1') + span(`p-${name}`, '$2'),
    },
  ]
  kerns.forEach(({ keys, searchFunc, replaceFunc }) =>
    keys.forEach(
      (name) => (str = str.replace(new RegExp(searchFunc(puncts[name]), 'g'), replaceFunc(name)))
    )
  )
  // CJK and latin/digits glue
  str = str
    .replace(
      /([\u4e00-\u9fff]|(?:<span class='[\w\s-]*'>[\u4e00-\u9fff]<\/span>))(?=\w)/g,
      span('cjk-latin-glue', '$1')
    )
    .replace(
      /(\w)(?=[\u4e00-\u9fff]|(?:<span class='[\w\s-]*'>[\u4e00-\u9fff]<\/span>))/g,
      span('latin-cjk-glue', '$1')
    )
    .replace(
      new RegExp(`<span class='(p-[\\w-]+)'>([，：；」』）])<\/span>(?=\\w)`, 'g'),
      span('$1 cjk-latin-glue', '$2')
    )
    .replace(
      new RegExp(`<span class='(p-before-open)'>(\\w+)<\/span>`, 'g'),
      span('$1 latin-cjk-glue', '$2')
    )
  // Avoid orphans
  str = str
    .replace(/([\u4e00-\u9fff])$/g, `<span class='no-break'>$1</span>`)
    .replace(
      /<span class='([\w\s-]*)'>([\u4e00-\u9fff])<\/span>(?=<span class='[\w\s-]*'>[。！？]<\/span>$)/g,
      `<span class='$1 no-break'>$2</span>`
    )
  return str
}

/**
 * @param {string} str
 */
export const fixWrap = (str) =>
  str.replace(/(\w+ \w+)(?=[\.!?\)]$)/g, '<span class="no-break">$1</span>')
