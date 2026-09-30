import React, { useState } from 'react';
import { Sparkles, Loader2, X, Wand2 } from 'lucide-react';
import { aiService } from '@/builder/ai/aiService';
import { useEditorStore } from '@/store';
import { Page } from '@/types/builder';

interface AIPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIPromptModal: React.FC<AIPromptModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentLocale = useEditorStore((state) => state.currentLocale);
  const pushHistory = useEditorStore((state) => state.pushHistory);

  if (!isOpen) return null;

  const quickPrompts = [
    '🦷 Стоматологическая клиника с ценами, услугами и отзывами',
    '☕ Уютная кофейня и ресторан авторской кухни с галереей',
    '🚀 SaaS IT-платформа с тарифами, статистикой и FAQ',
    '📱 Мобильное приложение для продуктивности',
  ];

  const handleGenerate = async (targetPrompt?: string) => {
    const textToUse = targetPrompt || prompt;
    if (!textToUse.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Generate page via AI Service (Schema & Registry compliant)
      const generatedPage: Page = await aiService.generatePageFromPrompt(
        textToUse.trim(),
        currentLocale
      );

      // Add generated page to project store
      pushHistory();
      useEditorStore.setState((state) => {
        if (!state.project) return state;
        return {
          project: {
            ...state.project,
            pages: [...state.project.pages, generatedPage],
          },
          selectedPageId: generatedPage.id,
          selectedBlockId: generatedPage.blocks[0]?.id || null,
          isDirty: true,
        };
      });

      onClose();
    } catch (err: any) {
      console.error('AI generation failed:', err);
      setError(err?.message || 'Не удалось сгенерировать страницу.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent">
          <div className="flex items-center gap-2 text-indigo-400">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-slate-100">AI Page Generator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Опишите бизнес или тематику сайта. AI создаст готовую структуру страницы с заголовками, блоками и текстами.
          </p>

          <div className="space-y-1.5">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Например: Современный фитнес-клуб с абонементами, расписанием тренировок, тренерами и формой заявки..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Quick prompt suggestions */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-slate-400">Быстрые примеры:</p>
            <div className="space-y-1.5">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(qp);
                    handleGenerate(qp);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-indigo-300 border border-slate-800 transition-all flex items-center justify-between group"
                >
                  <span className="truncate">{qp}</span>
                  <Wand2 className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <span>Отмена</span>
          </button>
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isLoading || !prompt.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{isLoading ? 'Генерирую страницу…' : 'Создать страницу'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
