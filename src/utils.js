const LUOHEI_CHARS =
  '上业个中书人今任位体作共击动十南印取变可叶同向品国图土夜大天始字对山工己平开录形态意我排文日明春月朝木本杜染样比毕水永江海潮点然王生田由画白的目空纛细织络置耳自色花草警计设转连造酬锚间随面风鹰黑'

export const randomChar = (random = true) =>
  random ? LUOHEI_CHARS[Math.floor(Math.random() * LUOHEI_CHARS.length)] : '字'
