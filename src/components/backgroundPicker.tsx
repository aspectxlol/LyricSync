import { useState, useEffect } from "react"
import LSDropzone from "./LSDropzone"

export default function Background() {
  const [backgroundIds, setBackgroundIds] = useState<{id: number, fileName: string, originalName: string}[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/background/get')
      .then(res => res.json())
      .then(data => {
        setBackgroundIds(data)
      })
  }, [backgroundIds])
  return (
    <div>
      <h1>Background</h1>
      <LSDropzone />
      <div className='flex flex-wrap'>
        {backgroundIds.map(image => <img src={`http://localhost:3000/background/get/${image.fileName}`} key={image.fileName} className='max-w-40 object-contain border-2 border-black rounded-md m-2' />)}
      </div>
    </div>
  )
}