import React from 'react';
import { TechTool } from '../types';
import { Layers, Database, Globe, Server, Code2, Wrench, Terminal, Cpu } from 'lucide-react';

interface TechCardProps {
  tool: TechTool;
  index: number;
}

const getIconForCategory = (category: string) => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('front')) return <Globe className="w-5 h-5" />;
  if (lowerCat.includes('back') || lowerCat.includes('api')) return <Server className="w-5 h-5" />;
  if (lowerCat.includes('data') || lowerCat.includes('store')) return <Database className="w-5 h-5" />;
  if (lowerCat.includes('devops') || lowerCat.includes('cloud')) return <Terminal className="w-5 h-5" />;
  if (lowerCat.includes('ai') || lowerCat.includes('ml')) return <Cpu className="w-5 h-5" />;
  if (lowerCat.includes('language')) return <Code2 className="w-5 h-5" />;
  return <Layers className="w-5 h-5" />;
};

export const TechCard: React.FC<TechCardProps> = ({ tool, index }) => {
  // Staggered animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <div 
      className="group relative bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-transform duration-300">
            {getIconForCategory(tool.category)}
          </div>
          <h3 className="text-lg font-semibold text-slate-100 tracking-tight">
            {tool.name}
          </h3>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
          {tool.category}
        </span>
      </div>
      
      <p className="text-slate-400 text-sm leading-relaxed mt-3 pl-1">
        {tool.description}
      </p>

      {/* Decorative gradient blob on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition duration-500 -z-10" />
    </div>
  );
};
