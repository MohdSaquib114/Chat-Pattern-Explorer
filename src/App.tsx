import ChatInput from './components/Chat-Input'
import MainHeading from './components/Main-heading'
import { AnalysisProvider } from './components/Result-context'
import DarkThemeWrapper from './components/Wrapper'
import { ThemeProvider } from './components/theme-context'

export default function App() {

 
 
  return (
    <ThemeProvider>
      <AnalysisProvider>
        <DarkThemeWrapper>
          <MainHeading />
          <ChatInput />
        </DarkThemeWrapper>
      </AnalysisProvider>
    </ThemeProvider>
  )
}
