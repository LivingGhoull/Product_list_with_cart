import { useEffect, useState } from "react"

function useWindowWidth() {
  const [windowWidth, setWindowWidth ] = useState(window.innerWidth)

  useEffect(() => {
    const handleReasize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleReasize)
  }, [])
  
  return windowWidth
}

export default useWindowWidth