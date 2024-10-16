import { useState } from "react"
import { fetchEmbedding } from "../fetch/fetch"
import { LoadingBar } from "./loadingBar/loadingBar"

export interface Props {
  words: string[]
  initialDist: number
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  isFetching: boolean
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserArea = ({ props }: { props: Props }) => {
  const { words, initialDist, value, setValue, isFetching, setIsFetching } =
    props
  const [display, setDisplay] = useState<string>()
  const [score, setScore] = useState<number>()

  const getEmbeddingScore = async () => {
    setIsFetching(true)
    const fullSentence = `${words[0]} ${value} ${words[1]}`
    const input = fullSentence.split(/[^a-zA-Z]+/).join("\n")
    console.log(input)
    try {
      const result = await fetchEmbedding(input)
      if (!result) throw new Error()
      const distScore = result / initialDist
      console.log(`init: ${initialDist}, final: ${result}, score: ${distScore}`)
      setScore(distScore)
      setIsFetching(false)
    } catch {}
  }
  return (
    <div>
      <h1>You</h1>
      <div className="inline-block border-b border-neutral-500">
        <p className="inline-block">{words[0]}</p>
        <input
          type="text"
          className="inline-block px-2 focus:outline-none"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return
            if (value.length <= 0) return
            getEmbeddingScore()
            setDisplay(value)
          }}
        ></input>
        <p className="inline-block">{`${words[1]}.`}</p>
      </div>

      {display && <p>{`${words[0]} ${display} ${words[1]}.`}</p>}
      <div className="relative">
        {isFetching ? (
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
