"use client"
import React from 'react'
import { useTheme } from './theme-context'
import { Link, Quote, Pencil, Hash, Users, BarChart2, Lightbulb, Clock } from 'lucide-react'

export interface AnalysisData {
  Categorization: {
    "Links": string[];
    "Quotes": string[];
    "PersonalNotes": string[];
    Recommendations: string[];
    "Timestamp metadata": string[];
  };
  "Theme Detection": string[];
  "Patterns": {
    FrequentContributors: string[];
    TypicalFlow: string;
  };
  FrequencyAnalysis: {
    TotalLinks: number;
    TotalQuotes: number;
    TotalRecommendations: number;
    MostActiveParticipant: string;
  };
  Insights: string[];
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, icon, children, className }) => {
  const { theme } = useTheme()
  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </h2>
      {children}
    </div>
  )
}

export default function ChatAnalysisVisualization({ data }: { data: AnalysisData }) {
  const { theme } = useTheme()

  return (
    <div className={`w-full mt-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Chat Analysis Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Section title="Links/URLs" icon={<Link size={20} />} className="col-span-full">
          <ul style={{scrollbarWidth:"none"}} className="list-disc pl-5 space-y-2 max-h-60 overflow-y-auto">
            {data?.Categorization["Links"]?.map((link, index) => (
              <li key={index}>
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline break-all"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Quotes/Insights" icon={<Quote size={20} />}>
          <ul style={{scrollbarWidth:"none"}} className="list-disc pl-5 space-y-2 max-h-40 overflow-y-auto">
            {data.Categorization["Quotes"]?.map((quote, index) => (
              <li key={index} className="italic">{quote}</li>
            ))}
          </ul>
        </Section>

        <Section title="Personal Notes" icon={<Pencil size={20} />}>
          <ul style={{scrollbarWidth:"none"}} className="list-disc pl-5 space-y-2 max-h-40 overflow-y-auto">
            {data.Categorization["PersonalNotes"]?.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </Section>

        <Section title="Timestamps" icon={<Clock size={20} />}>
          <div style={{scrollbarWidth:"none"}} className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {data.Categorization["Timestamp metadata"]?.map((timestamp, index) => (
              <div 
                key={index} 
                className={`p-2 rounded font-mono text-sm ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                {timestamp}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Themes" icon={<Hash size={20} />}>
          <div style={{scrollbarWidth:"none"}} className="flex flex-wrap gap-2">
            {data["Theme Detection"]?.map((theme, index) => (
              <span 
                key={index} 
                className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {theme}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Pattern Recognition" icon={<Users size={20} />}>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Frequent Contributors:</h3>
              <div style={{scrollbarWidth:"none"}} className="flex flex-wrap gap-2">
                {data["Patterns"]?.FrequentContributors?.map((contributor, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {contributor}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Typical Flow:</h3>
              <p>{data["Patterns"]?.TypicalFlow}</p>
            </div>
          </div>
        </Section>

        <Section title="Frequency Analysis" icon={<BarChart2 size={20} />}>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p>Total Links: {data?.FrequencyAnalysis?.TotalLinks}</p>
            </div>
            <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p>Total Quotes: {data?.FrequencyAnalysis?.TotalQuotes}</p>
            </div>
            <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p>Total Recommendations: {data?.FrequencyAnalysis?.TotalRecommendations}</p>
            </div>
            <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p>Most Active: {data?.FrequencyAnalysis?.MostActiveParticipant}</p>
            </div>
          </div>
        </Section>

        <Section title="Insights" icon={<Lightbulb size={20} />} className="col-span-full">
          <ul style={{scrollbarWidth:"none"}} className="list-disc pl-5 space-y-2">
            {data.Insights?.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  )
}

