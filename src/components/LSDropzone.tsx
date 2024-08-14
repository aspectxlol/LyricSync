import { useDropzone } from "react-dropzone"
import Upload from "../assets/upload"
import { useState } from "react"

export default function LSDropzone() {
  const [isUploaded, setIsUploaded] = useState(false)
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/png': ['.png'],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
      setIsUploaded(true)

      const data = new FormData()
      acceptedFiles.forEach((file) => {
        data.append('background', file)
      })
      fetch('http://localhost:3000/background/add', {
        method: 'POST',
        body: data,
      })
    },
    disabled: isUploaded,
  })

  return (
    <div {...getRootProps()} className="p-4 rounded-md m-2 w-4/5 border-dotted border-2 border-black flex flex-col justify-center items-center">
      <input {...getInputProps()} className="" accept=".png" />
      <Upload className="w-16 h-16 m-auto text-green-500" />
      <p>{  isUploaded ? "Background image uploaded" : "Drag 'n' drop some files here, or click to select files" }</p>
    </div>
  )
}