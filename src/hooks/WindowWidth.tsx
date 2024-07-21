import { useEffect, useState } from "react"

function WindowWidth() {
  const [windowWidth, setWindowWidth ] = useState(window.innerWidth)

  useEffect(() => {
    const handleReasize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleReasize)
  }, [])
  
  return windowWidth
}

export default WindowWidth