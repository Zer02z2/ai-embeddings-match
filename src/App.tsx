import { useEffect, useState } from "react"
import { AiArea } from "./components/aiArea"
import { Header } from "./components/header"
import { UserArea } from "./components/userArea"
import { fetchEmbedding, fetchWords } from "./fetch/fetch"

export const App = () => {
  const [words, setWords] = useState<string[] | null>()
  const [banList, setBanList] = useState<string[]>([""])
  const [dist, setDist] = useState<number>()
  const [value, setValue] = useState<string>("")
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    fetchRandomWords()
  }, [])

  const fetchRandomWords = async () => {
    try {
      const result = await fetchWords(banList)
      if (!result) throw new Error()
      setWords(result)
      setBanList([...banList, ...result])

      const initialDist = await fetchEmbedding(result.join("\n"))
      if (!initialDist) throw new Error()
      console.log(initialDist)
      setDist(initialDist)
    } catch {
      console.log("fetch words failed")
    }
  }

  return (
    <div className="flex justify-center w-screen h-screen py-20">
      <div className="flex flex-col w-full h-full max-w-7xl">
        <div className="flex-none pb-20 min-h-40">
          <Header words={words} />
          <button
            className="px-2 py-1 mt-4 bg-gray-300 rounded-md"
            onClick={() => {
              setWords(null)
              fetchRandomWords()
            }}
          >
            Reset
          </button>
        </div>
        <div className="grid flex-1 grid-cols-2">
          {words && dist && (
            <>
              <UserArea
                props={{
                  words: words,
                  initialDist: dist,
                  value: value,
                  setValue: setValue,
                  isFetching: isFetching,
                  setIsFetching: setIsFetching,
                }}
              />
              <AiArea
                props={{
                  words: words,
                  initialDist: dist,
                  value: value,
                  setValue: setValue,
                  isFetching: isFetching,
                  setIsFetching: setIsFetching,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
