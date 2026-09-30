'use client';

import React, { useState, useEffect, useRef } from 'react';

interface InlineEditableTextProps {
  value: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  isEditorMode?: boolean;
  onChange: (newValue: string) => void;
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  tagName: Tag = 'span',
  className = '',
  multiline = false,
  placeholder = 'Введите текст...',
  isEditorMode = false,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (!isEditorMode) {
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          className={`${className} bg-slate-900/90 text-white ring-2 ring-indigo-500 rounded p-1 outline-none resize-none`}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className={`${className} bg-slate-900/90 text-white ring-2 ring-indigo-500 rounded px-1.5 py-0.5 outline-none`}
      />
    );
  }

  return (
    <Tag
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      title="Нажмите дважды или кликните для редактирования"
      className={`${className} cursor-text hover:outline-dashed hover:outline-1 hover:outline-indigo-400 rounded transition-all`}
    >
      {value || placeholder}
    </Tag>
  );
};
