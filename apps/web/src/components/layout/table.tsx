'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Loader2, MoreVertical } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

export interface RowAction<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: ReactNode;
  variant?: 'default' | 'danger';
  disabled?: boolean | ((item: T) => boolean);
  hidden?: boolean | ((item: T) => boolean);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  rowActions?: RowAction<T>[];
  actionsHeader?: string;
}

interface RowActionMenuProps<T> {
  item: T;
  actions: RowAction<T>[];
}

function RowActionMenu<T>({ item, actions }: RowActionMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const visibleActions = actions.filter((action) =>
    typeof action.hidden === 'function' ? !action.hidden(item) : !action.hidden
  );

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (visibleActions.length === 0) return null;

  return (
    <div ref={menuRef} className="relative inline-flex justify-end">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Abrir menu de ações"
        className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#307FE2]/40"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 z-30 min-w-44 bg-white rounded-xl border border-zinc-200 shadow-lg py-1 text-left"
        >
          {visibleActions.map((action, idx) => {
            const isDisabled =
              typeof action.disabled === 'function'
                ? action.disabled(item)
                : Boolean(action.disabled);
            const isDanger = action.variant === 'danger';

            return (
              <button
                key={idx}
                type="button"
                role="menuitem"
                disabled={isDisabled}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  action.onClick(item);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                  isDanger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                {action.icon && <span className="w-4 h-4 shrink-0 flex items-center justify-center">{action.icon}</span>}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  keyExtractor,
  emptyMessage = 'Nenhum registro encontrado.',
  rowActions = [],
  actionsHeader = 'Ações',
}: DataTableProps<T>) {
  const hasActions = rowActions.length > 0;
  const colSpanCount = columns.length + (hasActions ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 text-xs uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className={`py-3 px-4 font-bold ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th className="py-3 px-4 font-bold text-right w-20">{actionsHeader}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-800 text-xs sm:text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={colSpanCount} className="py-8 text-center text-zinc-500">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#307FE2]" />
                    <span className="text-xs font-medium">Carregando...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpanCount} className="py-8 text-center text-zinc-500 text-xs">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-zinc-50/80 transition-colors">
                  {columns.map((col, index) => (
                    <td key={index} className={`py-3 px-4 ${col.className || ''}`}>
                      {col.cell
                        ? col.cell(item)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? '')
                        : null}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="py-3 px-4 text-right">
                      <RowActionMenu item={item} actions={rowActions} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}