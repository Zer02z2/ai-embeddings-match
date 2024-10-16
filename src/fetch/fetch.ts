import { wordsPrompt, Data, embeddingPrompt } from "./prompts"

const url = "https://replicate-api-proxy.glitch.me/create_n_get/"

export const fetchWords = async (banList: string[]): Promise<string[]> => {
  try {
    const result = await fetchData(wordsPrompt(banList))
    const wordArr = result.split(/[^a-zA-Z]+/)
    if (wordArr.length !== 2) {
      return fetchWords(banList)
    }
    return wordArr
  } catch {
    return fetchWords(banList)
  }
}

export const fetchEmbedding = async (input: string) => {
  const result = await fetchData(embeddingPrompt(input))
}

export const fetchData = async (data: Data[keyof Data]): Promise<string> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data["data"]),
  }
  try {
    console.log("Start fetching")
    const response = await fetch(url, options)
    const parsedResponse = await response.json()
    if (data["type"] === "text") {
      const result: string = parsedResponse.output
        .join("")
        .match(/\+([^+]+)\+/)[1]
        .trim()
      return result
    }
    if (data["type"] === "embedding") {
      console.log(parsedResponse)
      return "done"
    }
    return fetchData(data)
  } catch {
    console.log("Trying again...")
    return fetchData(data)
  }
}
