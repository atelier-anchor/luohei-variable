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

export const randomChar = (locale, excludeSimple = false) => {
  const chars = LUOHEI_CHARS[locale] + (excludeSimple ? '' : '一二三')
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
    .replace(/([\u4e00-\u9fff])([a-z0-9])/gi, '$1<span class="cjk-latin-glue"></span>$2')
    .replace(/([a-z0-9])([\u4e00-\u9fff])/gi, '$1<span class="cjk-latin-glue"></span>$2')
    // Avoid orphans
    .replace(/([\u4e00-\u9fff])([。！？])$/g, '<span class="no-break">$1</span>$2')
    .replace(/([a-z0-9,]+ [a-z0-9,]+ [a-z0-9]+)([\.!?\)])$/gi, '<span class="no-break">$1</span>$2')
