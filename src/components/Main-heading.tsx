import { useTheme } from "./theme-context"

export default function MainHeading() {
  const { theme } = useTheme()

  // Color palettes for light and dark themes
  const themeColors = {
    light: {
      background: 'bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100',
      title: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600',
      subtitle: 'text-gradient-to-r from-indigo-600 via-purple-500 to-pink-500'
    },
    dark: {
      background: 'bg-gradient-to-r from-gray-900 via-purple-900 to-black',
      title: 'text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500',
      subtitle: 'text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'
    }
  }

  // Select colors based on current theme
  const currentTheme = themeColors[theme]

  return (
    <div className={`w-full text-center py-8 px-4 `}>
      <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 ${currentTheme.title}`}>
        WhatsApp Chat Pattern Explorer
      </h1>
      <p className={`text-lg md:text-xl lg:text-2xl font-semibold ${currentTheme.subtitle}`}>
        Analyze and Discover Insights from Your Conversations
      </p>
    </div>
  )
}