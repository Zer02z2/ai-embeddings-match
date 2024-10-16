import { LoadingBar } from "./loadingBar/loadingBar"

export const Header = ({ words }: { words: string[] | null | undefined }) => {
  return (
    <div>
      <h1 className="text-3xl">Compete your thought efficiency with AI.</h1>
      <h2>Make the shortest sentence that connects the following two words:</h2>
      <div className="relative">
        {words ? (
          <div className="flex pt-4 gap-x-6">
            <h3 className="text-xl font-medium text-gray-500">{words[0]}</h3>
            <h3 className="text-xl font-medium text-gray-500">{words[1]}</h3>
          </div>
        ) : (
          <LoadingBar />
        )}
      </div>
    </div>
  )
}
