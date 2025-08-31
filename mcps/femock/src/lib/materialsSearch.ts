import * as fs from 'fs';
import * as path from 'path';
import { getMaterialsDirectory, readFileContent } from './fileUtils.js';

export interface MaterialMatch {
  filePath: string;
  fileName: string;
  content: string;
  relevanceScore: number;
}

export function extractKeywords(text: string): string[] {
  // Simple keyword extraction - in production, you might want to use NLP libraries
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']);
  
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word));
  
  // Count frequency and return top keywords
  const wordCount = new Map<string, number>();
  words.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });
  
  return Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
}

export function searchMaterials(keywords: string[], maxResults: number = 10): MaterialMatch[] {
  const materialsDir = getMaterialsDirectory();
  const matches: MaterialMatch[] = [];
  
  function searchDirectory(dirPath: string) {
    if (!fs.existsSync(dirPath)) return;
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        searchDirectory(itemPath);
      } else if (item.endsWith('.md')) {
        try {
          const content = readFileContent(itemPath);
          const relevanceScore = calculateRelevance(item, content, keywords);
          
          if (relevanceScore > 0) {
            matches.push({
              filePath: itemPath,
              fileName: item,
              content: content.substring(0, 1000), // Truncate for context
              relevanceScore
            });
          }
        } catch (error) {
          console.warn(`Failed to read material file ${itemPath}:`, error);
        }
      }
    }
  }
  
  searchDirectory(materialsDir);
  
  return matches
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxResults);
}

function calculateRelevance(fileName: string, content: string, keywords: string[]): number {
  let score = 0;
  const lowerFileName = fileName.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    
    // Filename matches are weighted higher
    if (lowerFileName.includes(lowerKeyword)) {
      score += 10;
    }
    
    // Content matches
    const contentMatches = (lowerContent.match(new RegExp(lowerKeyword, 'g')) || []).length;
    score += contentMatches * 2;
  }
  
  return score;
}