import { useContext } from "react"
import { contextData } from "../../context/logic"

function MyErrorModal() {
  const {setErrorMessage} = useContext(contextData);

  setTimeout(() => {
    setErrorMessage(false)
  }, 3000)

  return (
    <div className="anim absolute top-[150px] left-[20px] rounded-[10px] bg-red-500">
        <p className="px-4 py-1 text-white cursor-default">Happened error...</p>
    </div>
  )
}

export default MyErrorModal