export function getCleaningText(textResponse: string[]) {
  const formatText = textResponse.reduce((prev: string[], curr: string) => {
    const regex = /[%|\d][a-zA-Z]/
    const formatString = JSON.parse(JSON.stringify(curr.replace(/\s/g, '')))
    const indexRegex = regex.exec(formatString)
    if (!!indexRegex) {
      return [
        ...prev,
        formatString.slice(0, indexRegex.index + 1),
        formatString.slice(indexRegex.index + 1),
      ]
    }
    return [...prev, formatString]
  }, [])

  return formatText
}