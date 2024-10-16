import { useEffect, useState } from "react"
import { LoadingBar } from "./loadingBar/loadingBar"
import { Props } from "./userArea"
import { fetchEmbedding, fetchSentence } from "../fetch/fetch"

export const AiArea = ({ props }: { props: Props }) => {
  const { words, initialDist, value, setValue, isFetching, setIsFetching } =
    props

  const [display, setDisplay] = useState<string>()
  const [score, setScore] = useState<number>()
  const [selfFetching, setSelfFetching] = useState<boolean>(false)

  useEffect(() => {
    fetchAiSentence()
  }, [isFetching])

  const fetchAiSentence = async () => {
    if (isFetching === false) return
    const numberOfWords = value.split(/[^a-zA-Z]+/).length
    setValue("")
    console.log(numberOfWords)
    try {
      const result = await fetchSentence(words, numberOfWords)
      if (!result) throw new Error()
      setDisplay(result)
      await getEmbeddingScore(result)
    } catch {}
  }
  const getEmbeddingScore = async (sentence: string) => {
    setSelfFetching(true)
    const input = sentence.split(/[^a-zA-Z]+/).join("\n")
    try {
      const result = await fetchEmbedding(input)
      if (!result) throw new Error()
      const distScore = result / initialDist
      console.log(`init: ${initialDist}, final: ${result}, score: ${distScore}`)
      setScore(distScore)
      setSelfFetching(false)
    } catch {}
  }
  return (
    <div>
      <h1>AI</h1>
      {display ? (
        <p>{display}</p>
      ) : (
        <div className="relative">
          <LoadingBar />
        </div>
      )}
      <div className="relative">
        {selfFetching ? (
          <LoadingBar />
        ) : (
          score && (
            <>
              <h2>Embedding score:</h2>
              <p>{score}</p>
            </>
          )
        )}
      </div>
    </div>
  )
}
