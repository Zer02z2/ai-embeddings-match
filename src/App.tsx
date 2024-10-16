import { AiArea } from "./components/aiArea"
import { Header } from "./components/header"
import { UserArea } from "./components/userArea"

export const App = () => {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex flex-col w-full h-full max-w-7xl">
        <div className="flex-none border border-red-500">
          <Header />
        </div>
        <div className="grid flex-1 grid-cols-2 border border-blue-500">
          <UserArea />
          <AiArea />
        </div>
      </div>
    </div>
  )
}
