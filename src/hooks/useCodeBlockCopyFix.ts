'use client';

import { useEffect } from 'react';

/**
 * 修复代码块选中复制时换行丢失的问题
 * Shiki 渲染的代码块每行被 <span class="line"> 包装，
 * 浏览器选中复制时无法识别行间的隐式换行
 */
export const useCodeBlockCopyFix = () => {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      // 获取选中范围的公共祖先
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;

      // 检查是否在代码块内（Shiki 高亮的代码块）
      const codeBlock =
        container instanceof Element
          ? container.closest('.ant-highlighter-highlighter-shiki')
          : container.parentElement?.closest('.ant-highlighter-highlighter-shiki');

      if (!codeBlock) return;

      // 获取所有选中的 .line 元素
      const allLines = codeBlock.querySelectorAll('.line');
      if (allLines.length === 0) return;

      // 收集选中范围内的行
      const selectedLines: string[] = [];
      for (const line of allLines) {
        if (selection.containsNode(line, true)) {
          selectedLines.push(line.textContent || '');
        }
      }

      if (selectedLines.length > 1) {
        // 用换行符连接各行
        const text = selectedLines.join('\n');
        e.clipboardData?.setData('text/plain', text);
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);
};
