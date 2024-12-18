import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-context'
import { useAnalysisContext } from './Result-context'

interface DarkThemeWrapperProps {
  children: React.ReactNode
}

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  // Theme-specific styles
  const themeStyles = {
    light: {
      button: 'bg-gradient-to-br from-white to-gray-100 border-gray-200 hover:bg-gray-100 text-indigo-600 hover:text-indigo-700',
      icon: 'text-indigo-600 hover:text-indigo-800'
    },
    dark: {
      button: 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:bg-gray-800 text-teal-300 hover:text-teal-200',
      icon: 'text-teal-300 hover:text-teal-200'
    }
  }

  const currentTheme = themeStyles[theme]

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`fixed top-4 right-[17rem] z-50 shadow-md transition-all duration-300 
        ${currentTheme.button} 
        hover:shadow-lg active:scale-95`}
    >
      {theme === 'light' ? 
        <Moon className={`h-[1.2rem] w-[1.2rem] ${currentTheme.icon} transition-colors`} /> : 
        <Sun className={`h-[1.2rem] w-[1.2rem] ${currentTheme.icon} transition-colors`} />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const SlideInMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const {
 
   results,
    setCurrentResult,
   } =  useAnalysisContext()

  const themeStyles = {
    light: {
      background: 'bg-gradient-to-br from-white to-gray-50',
      text: 'text-gray-800',
      menuButton: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',
      menuIcon: 'text-white',
      itemHover: 'hover:bg-blue-50 hover:text-blue-700'
    },
    dark: {
      background: 'bg-gradient-to-br from-gray-800 to-gray-900',
      text: 'text-gray-200',
      menuButton: 'bg-gradient-to-br from-teal-700 to-blue-800 text-white hover:from-teal-800 hover:to-blue-900',
      menuIcon: 'text-white',
      itemHover: 'hover:bg-gray-700 hover:text-teal-300'
    }
  }

  const currentTheme = themeStyles[theme]

 

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed w-[15rem] top-4 right-2 z-50 shadow-md transition-all duration-300 
          ${currentTheme.menuButton}
          hover:shadow-lg active:scale-95`}
      >
        {/* {isOpen ? 
          <X className={`h-[1.2rem] w-[1.2rem] ${currentTheme.menuIcon} transition-colors`} /> : 
          <Menu className={`h-[1.2rem] w-[1.2rem] ${currentTheme.menuIcon} transition-colors`} />
        } */}
        {/* <span className="sr-only">Toggle Menu</span> */}
        Saved Chats
      </Button>

      <div 
        className={`fixed top-0 right-0 h-full w-64 z-40 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${currentTheme.background} 
          ${currentTheme.text} 
          shadow-2xl`}
      >
        <div className="p-6 pt-20">
         
          <div className="space-y-4">

            {
            results.length > 0 ?
            results.map((chat, index) => (
              <button
                key={index}
                onClick={()=>setCurrentResult(chat.result)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 
                  ${currentTheme.itemHover}`}
              >
                {chat.name}
              </button>
            )):
            <h2>No saved data!</h2>
            }
          </div>
        </div>
      </div>
    </>
  )
}

const DarkThemeWrapper: React.FC<DarkThemeWrapperProps> = ({ children }) => {
  const { theme } = useTheme()

  // Theme-specific background gradients
  const themeBackgrounds = {
    light: 'bg-gradient-to-br from-white via-blue-50 to-purple-50',
    dark: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ease-in-out 
      ${themeBackgrounds[theme]} 
      text-foreground`}>
      <div className="relative">
        <ThemeToggle />
        <SlideInMenu />
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DarkThemeWrapper