import { useState } from "react"
import { fetchEmbedding } from "../fetch/fetch"

export const UserArea = ({ words }: { words: string[] }) => {
  const [value, setValue] = useState<string>("")

  const getEmbeddingScore = async () => {
    const input = value.split(/[^a-zA-Z]+/).join("\n")
    console.log(input)
    const result = await fetchEmbedding(input)
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
            setValue("")
          }}
        ></input>
        <p className="inline-block">{`${words[1]}.`}</p>
      </div>
    </div>
  )
}
