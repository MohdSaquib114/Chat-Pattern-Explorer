"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AnalysisData {
  Categorization: {
    Links: string[];
    Quotes: string[];
    PersonalNotes: string[];
    Recommendations: string[];
    "Timestamp metadata": string[];
  };
  "Theme Detection": string[];
  Patterns: {
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

export interface AnalysisItem {
  name: string | undefined;
  result: AnalysisData | null;
}

interface AnalysisContextProps {
  results: AnalysisItem[];
  currentResult: AnalysisData | null;
  addResult: (newResult: AnalysisItem) => void;
  setCurrentResult: (result: AnalysisData | null) => void;
}

const AnalysisContext = createContext<AnalysisContextProps | undefined>(undefined);


export const useAnalysisContext = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysisContext must be used within an AnalysisProvider');
  }
  return context;
};

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [results, setResults] = useState<AnalysisItem[]>(() => {
    const savedResults = localStorage.getItem('analysisResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  
  const [currentResult, setCurrentResult] = useState<AnalysisData | null>(null);

  useEffect(() => {
    localStorage.setItem('analysisResults', JSON.stringify(results));
  }, [results]);

 
  const addResult = (newResult: AnalysisItem) => {
    setResults((prevResults) => [...prevResults, newResult]);
  };

  return (
    <AnalysisContext.Provider
      value={{
        results,
        currentResult,
        addResult,
        setCurrentResult,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};
