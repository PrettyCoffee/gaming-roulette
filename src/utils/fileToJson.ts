export const fileToJson = async (file: File) => {
  const text = await file.text()
  try {
    return JSON.parse(text) as unknown
  } catch {
    return null
  }
}
