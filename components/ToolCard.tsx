
import React from 'react';
import { AITool, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useApp } from '../store';

interface ToolCardProps {
  tool: AITool;
  onSelect: (tool: AITool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const { state } = useApp();
  const t = TRANSLATIONS[state.language];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {tool.icon}
          </div>
          <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">PREMIUM</div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{tool.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{tool.description}</p>
        
        <div className="space-y-2 mb-6">
          {tool.features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              {f}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Starts from</span>
          <span className="text-xl font-bold text-gray-900">
            {tool.plans[0].price} <span className="text-sm font-medium">BDT</span>
          </span>
        </div>
        <button 
          onClick={() => onSelect(tool)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          {t.details}
        </button>
      </div>
    </div>
  );
};
