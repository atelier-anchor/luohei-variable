const LUOHEI_CHARS =
  '一三上不丙业东两个中乙书二于产人今任传位体作值全共关击划刘创动化十南占印反取变可叶号叽同向启品四国图土声复夜大天始字学家宽对导小山工己师平年应度开式录形态恢意感我或技持排控播支文方无日明春显曾月朝木本术机杜染标样格横正比毕水永江济海涟源漪潮点然版王生用田由甲画白的目直看示祥空笔粗纛纤细织络置耳育自色花草行观警计认设距转过这连速造酬里重量钦锚闭间院随面页项风鹰黎黑默'

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

export const randomChar = (excludeSimple = false) => {
  const chars = excludeSimple ? LUOHEI_CHARS.replace(/[一二三]/g, '') : LUOHEI_CHARS
  return chars[Math.floor(Math.random() * chars.length)]
}

export const namedInstance = (weight, contrast) => LUOHEI_NAMED_INSTANCES[weight][contrast]

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const scale = (x, min = 100, max = 900) => Math.round(x * (max - min) + min)

export const expScale = (n, k, min = 100, max = 900) =>
  [...Array(n).keys()].map((i) =>
    Math.round(((Math.exp(k * i) - 1) / (Math.exp(k * n - k) - 1)) * (max - min) + min)
  )

export const cjkKern = (str) =>
  str
    // Right puncts
    .replace(/([，」）])([\u4e00-\u9fff])/g, '<span class="cjk-kern-sm">$1</span>$2')
    .replace(/([。！？])([\u4e00-\u9fff])/g, '<span class="cjk-kern-md">$1</span>$2')
    // Left puncts
    .replace(/([\u4e00-\u9fff])([「（)])/g, '<span class="cjk-kern-sm">$1</span>$2')
    // Inter-punct spacing
    .replace(/([，」）])([「（)])/g, '<span class="cjk-kern-sm">$1</span>$2')
    .replace(/([。！？])([「（)])/g, '<span class="cjk-kern-md">$1</span>$2')
    // CJK and latin/digits spacing
    .replace(/([\u4e00-\u9fff])([a-z0-9])/g, '$1<span class="cjk-latin-glue"></span>$2')
    .replace(/([a-z0-9])([\u4e00-\u9fff])/g, '$1<span class="cjk-latin-glue"></span>$2')
    // Avoid orphans
    .replace(/([\u4e00-\u9fff]{2})([。！？])$/g, '<span class="nowrap">$1</span>$2')
    .replace(/([a-z0-9,]+ [a-z0-9,]+ [a-z0-9]+)([\.!?])$/g, '<span class="nowrap">$1</span>$2')
