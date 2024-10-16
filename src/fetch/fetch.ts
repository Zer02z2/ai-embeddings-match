import { wordsPrompt, Data } from "./prompts"

const url = "https://replicate-api-proxy.glitch.me/create_n_get/"

export const getWords = async (banList: string[]) => {
  const result = await fetchData(wordsPrompt(banList))
  return result
}

export const fetchData = async (data: Data): Promise<string> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }
  try {
    console.log("Start fetching")
    const response = await fetch(url, options)
    const parsedResponse = await response.json()
    const result: string = parsedResponse.output
      .join("")
      .match(/\+([^+]+)\+/)[1]
      .trim()
    return result
  } catch {
    console.log("Trying again...")
    return fetchData(data)
  }
}
