import { useEffect, useState } from "react"
import { AiArea } from "./components/aiArea"
import { Header } from "./components/header"
import { UserArea } from "./components/userArea"
import { fetchWords } from "./fetch/fetch"

export const App = () => {
  const [words, setWords] = useState<string[] | null>()
  const [banList, setBanList] = useState<string[]>([""])

  useEffect(() => {
    fetchRandomWords()
  }, [])

  const fetchRandomWords = async () => {
    const result = await fetchWords(banList)
    setWords(result)
    setBanList([...banList, ...result])
  }
  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex flex-col w-full h-full max-w-7xl">
        <div className="flex-none border border-red-500">
          <Header words={words} />
        </div>
        <div className="grid flex-1 grid-cols-2 border border-blue-500">
          {words && (
            <>
              <UserArea words={words} />
              <AiArea />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
