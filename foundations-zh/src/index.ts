export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  // implement
  const res: ErrorMessage = {
    message: err.message,
    stack: [],
  }
  if (!err.stack) return res
  const lines = err.stack.split('\n')
  let chrome = false,
    firefox = false
  const chromeReg = /at (?:\S+ )?(\S+:\/\/[\d\D]+):(\d+):(\d+)$/,
    firefoxReg = /(?:\S+@)?(\S+:\/\/[\d\D]+):(\d+):(\d+)$/
  for (let line of lines) {
    if (chromeReg.test(line)) {
      chrome = true
      break
    }
    if (firefoxReg.test(line)) {
      firefox = true
      break
    }
  }

  if (chrome || firefox) {
    let regex = chrome ? chromeReg : firefoxReg
    for (let line of lines) {
      const ans = line.match(regex)

      if (ans) {
        res.stack.push({
          filename: ans[1],
          line: Number(ans[2]),
          column: Number(ans[3]),
        })
      }
    }
  }
  return res
}
