"use client"
import React, { useState, useRef } from 'react'
import { Upload, CheckCircle, Loader, Save } from 'lucide-react'
import { useTheme } from './theme-context'
import toast, { Toaster } from 'react-hot-toast'
import { analyzer } from '@/lib/groq'
import ChatAnalysisVisualization, { AnalysisData } from './Chat-Analysis-Result'
import { useAnalysisContext } from './Result-context'

export default function ChatInput() {
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisData | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
 const {
 
  currentResult,
  addResult,
  setCurrentResult,
 } =  useAnalysisContext()
  const { theme } = useTheme()
  const notify = (m: string) => toast(m)

  const fileParser = (file: File) => {
    if (file && file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = () => {
        setFile(file)
        setFileContent(reader.result as string)
      }
      reader.readAsText(file)
    } else {
      notify("Invalid file type. Please upload a .txt file.")
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const droppedFile = e.dataTransfer.files[0]
    fileParser(droppedFile)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) fileParser(selectedFile)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const analyzeChat = async () => {
    setIsAnalyzing(true)
    try {
      const analyzedRes = await analyzer(fileContent as string)
      setResult(analyzedRes)
      setCurrentResult(analyzedRes)
    } catch (error) {
      notify("Something went wrong on our side")
      console.log(error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const saveResult = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const resultObj = {
      name:file?.name,
      result:result
    }
    addResult(resultObj)
    notify("Result saved successfully!")
    setIsSaving(false)
  }


  const themeStyles = {
    light: {
      container: '',
      heading: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600',
      dropzone: {
        base: 'border-indigo-200 bg-white/70 hover:bg-indigo-50/50',
        border: isDragActive ? 'border-indigo-400' : 'border-indigo-200',
        text: 'text-indigo-700',
        icon: 'text-indigo-500'
      },
      buttons: {
        remove: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600',
        analyze: 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600',
        save: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
      }
    },
    dark: {
      container: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black',
      heading: 'text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500',
      dropzone: {
        base: 'border-gray-700 bg-gray-800/70 hover:bg-gray-700/50',
        border: isDragActive ? 'border-teal-500' : 'border-gray-700',
        text: 'text-gray-300',
        icon: 'text-teal-400'
      },
      buttons: {
        remove: 'bg-gradient-to-r from-red-700 to-pink-700 text-white hover:from-red-800 hover:to-pink-800',
        analyze: 'bg-gradient-to-r from-green-700 to-teal-700 text-white hover:from-green-800 hover:to-teal-800',
        save: 'bg-gradient-to-r from-blue-700 to-purple-700 text-white hover:from-blue-800 hover:to-purple-800'
      }
    }
  }

  const currentTheme = themeStyles[theme]

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 min-h-screen`}>
      <div className="mb-8">
        <h2 className={`text-2xl font-bold mb-4 ${currentTheme.heading}`}>
          Upload Your WhatsApp Chat
        </h2>
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 
            ${currentTheme.dropzone.base} 
            ${currentTheme.dropzone.border} 
            ${currentTheme.dropzone.text} 
            ${isDragActive ? 'scale-105 shadow-xl' : 'shadow-md'}`}
        >
          <input
            type="file"
            title='file-input'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt"
            className="hidden"
          />
          {file ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-xl font-semibold mb-2">{file.name}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className={`w-16 h-16 mb-4 ${currentTheme.dropzone.icon}`} />
              <p className="text-xl font-semibold mb-2">
                {isDragActive ? 'Drop the file here' : 'Drag & drop WhatsApp chat file here'}
              </p>
              <p className={`text-sm mb-4 ${currentTheme.dropzone.text}`}>or</p>
              <button
                onClick={handleButtonClick}
                className={`px-6 py-3 border rounded-full text-sm font-medium transition-all duration-300 
                  ${currentTheme.dropzone.text} 
                  border-current 
                  hover:bg-current hover:bg-opacity-10 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Select a file
              </button>
            </div>
          )}
        </div>
      </div>

      {file && (
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setFile(null)}
            className={`px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 
              ${currentTheme.buttons.remove}`}
          >
            Remove File
          </button>
          <button
            onClick={analyzeChat}
            disabled={isAnalyzing}
            className={`px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 
              ${currentTheme.buttons.analyze}
              ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? (
              <><Loader className="inline-block mr-2 animate-spin" size={16} /> Analyzing...</>
            ) : (
              'Find Insights'
            )}
          </button>
          {result && (
            <button
              onClick={saveResult}
              disabled={isSaving}
              className={`px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 
                ${currentTheme.buttons.save}
                ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <><Loader className="inline-block mr-2 animate-spin" size={16} /> Saving...</>
              ) : (
                <><Save className="inline-block mr-2" size={16} /> Save Result</>
              )}
            </button>
          )}
        </div>
      )}

      {isAnalyzing && (
        <div className="mt-8 text-center">
          <Loader className="inline-block animate-spin mb-4" size={32} />
          <p className={`text-lg ${currentTheme.heading}`}>
            Analyzing your chat...
          </p>
        </div>
      )}

      {result && <ChatAnalysisVisualization data={currentResult as AnalysisData} />}
      
      <Toaster />
    </div>
  )
}