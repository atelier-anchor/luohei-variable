const LUOHEI_CHARS =
  '一三上不丙业东两个中乙书二于产人今任位体作值共关击划刘创动十南占印取变可叶号叽同向启品国图土声夜大天始字学家对导山工己师平年应开式录形态意感我或技持排控支文方日明春显曾月朝木本术机杜染样横比毕水永江济海涟源漪潮点然王生用田由甲画白的目直看示祥空笔粗纛细织络置耳育自色花草观警计设转过这连造酬里量钦锚闭间院随面页项风鹰黎黑'

export const HEADER_HEIGHT = 56

export const randomChar = (excludeSimple = false) => {
  const chars = excludeSimple ? LUOHEI_CHARS.replace(/[一二三]/g, '') : LUOHEI_CHARS
  return chars[Math.floor(Math.random() * chars.length)]
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const scale = (x, min = 100, max = 900) => Math.round(x * (max - min) + min)

export const expScale = (n, k, min = 100, max = 900) =>
  [...Array(n).keys()].map((i) =>
    Math.round(((Math.exp(k * i) - 1) / (Math.exp(k * n - k) - 1)) * (max - min) + min)
  )

export const cjkKern = (str) =>
  str
    .replace(/，([\u4e00-\u9fff])/g, '<span class="cjk-kern-sm">，</span>$1')
    .replace(/([。！])([\u4e00-\u9fff])/g, '<span class="cjk-kern-md">$1</span>$2')
    .replace(/([\u4e00-\u9fff])「/g, '$1<span class="cjk-kern-sm"></span>「')
    .replace(/」([\u4e00-\u9fff])/g, '<span class="cjk-kern-sm">」</span>$1')
    .replace(/，「/g, '<span class="cjk-kern-sm">，</span>「')
    .replace(/([。！])「/g, '<span class="cjk-kern-md">$1</span>「')
    .replace(/([\u4e00-\u9fff])(\d)/g, '$1<span class="cjk-kern-xs"></span>$2')
    .replace(/(\d)([\u4e00-\u9fff])/g, '$1<span class="cjk-kern-xs"></span>$2')
    .replace(/([\u4e00-\u9fff])([。！])$/g, '<span class="whitespace-nowrap">$1</span>$2')
