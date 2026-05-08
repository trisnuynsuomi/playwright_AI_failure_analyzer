import fs from 'fs'

export function collectCodeSnippet(stack?: string, range = 5) {
  if (!stack) return null

  const match = stack.match(/\((.*):(\d+):(\d+)\)/) || stack.match(/at (.*):(\d+):(\d+)/)
  if (!match) return null

  const [, filePath, lineRaw, columnRaw] = match
  const line = Number(lineRaw)
  const column = Number(columnRaw)

  if (!fs.existsSync(filePath)) return null

  const lines = fs.readFileSync(filePath, 'utf-8').split('\n')
  const start = Math.max(1, line - range)
  const end = Math.min(lines.length, line + range)

  return {
    filePath,
    line,
    column,
    snippet: lines
      .slice(start - 1, end)
      .map((content, index) => {
        const currentLine = start + index
        const marker = currentLine === line ? '>' : ' '
        return `${marker} ${currentLine} | ${content}`
      })
      .join('\n'),
  }
}