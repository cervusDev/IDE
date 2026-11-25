"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { MoreVertical } from "lucide-react";

export type RowActionVariant = "default" | "primary" | "danger";

export interface RowActionItem<T> {
  label: string;
  icon?: ReactNode;
  variant?: RowActionVariant;
  /** Renderiza como <Link> do Next.js quando informado */
  href?: string | ((item: T) => string);
  /** Executado ao clicar (ou após confirmar, se `confirm` estiver definido) */
  onClick?: (item: T) => Promise<void> | void;
  /** Oculta a ação dinamicamente para linhas específicas */
  hidden?: boolean | ((item: T) => boolean);
  /** Desabilita a ação dinamicamente */
  disabled?: boolean | ((item: T) => boolean);
  /** Exibe uma linha divisória acima deste item */
  dividerBefore?: boolean;
  /** Quando definido, abre um modal de confirmação antes de executar `onClick` */
  confirm?: {
    title?: string;
    description: ReactNode | ((item: T) => ReactNode);
    confirmLabel?: string;
    loadingLabel?: string;
  };
}

interface RowActionsMenuProps<T> {
  item: T;
  actions: RowActionItem<T>[];
  triggerTitle?: string;
}

interface MenuPosition {
  top: number;
  left: number;
  placement: "bottom" | "top";
}

const variantClasses: Record<RowActionVariant, string> = {
  default: "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900",
  primary: "text-zinc-700 hover:bg-blue-50 hover:text-[#307FE2]",
  danger: "text-red-600 hover:bg-red-50",
};

const MENU_MIN_WIDTH = 176; // min-w-44 = 11rem = 176px
const GAP = 6; // mt-1.5 / mb-1.5 ≈ 6px

export function RowActionsMenu<T>({
  item,
  actions,
  triggerTitle = "Ações",
}: RowActionsMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const [pendingAction, setPendingAction] = useState<RowActionItem<T> | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const mounted = true;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const visibleActions = actions.filter((action) =>
    typeof action.hidden === "function" ? !action.hidden(item) : !action.hidden
  );

  const updatePosition = useCallback(() => {
    const button = triggerRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? visibleActions.length * 36 + 16;
    const menuWidth = menuRef.current?.offsetWidth ?? MENU_MIN_WIDTH;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Abre para cima se não couber embaixo e houver mais espaço acima
    const openUpward =
      spaceBelow < menuHeight + GAP && spaceAbove > spaceBelow;

    const top = openUpward
      ? Math.max(8, rect.top - menuHeight - GAP)
      : Math.min(window.innerHeight - menuHeight - 8, rect.bottom + GAP);

    // Alinha a borda direita do menu com a borda direita do botão (sem sair da tela)
    const idealLeft = rect.right - menuWidth;
    const left = Math.max(8, Math.min(window.innerWidth - menuWidth - 8, idealLeft));

    setMenuPosition({
      top,
      left,
      placement: openUpward ? "top" : "bottom",
    });
  }, [visibleActions.length]);

  useEffect(() => {
    if (!open) return;

    updatePosition();

    // Recalcula após o primeiro paint caso a altura exata do menu seja diferente da estimativa
    const rafId = requestAnimationFrame(updatePosition);

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedTrigger && !clickedMenu) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handleScrollOrResize() {
      updatePosition();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open, updatePosition]);

  if (visibleActions.length === 0) return null;

  async function handleConfirmExecution() {
    if (!pendingAction?.onClick) return;
    setIsExecuting(true);
    try {
      await pendingAction.onClick(item);
      setPendingAction(null);
    } finally {
      setIsExecuting(false);
    }
  }

  const menuContent = open && mounted && (
    <div
      ref={menuRef}
      role="menu"
      style={{
        position: "fixed",
        top: menuPosition ? `${menuPosition.top}px` : "-9999px",
        left: menuPosition ? `${menuPosition.left}px` : "-9999px",
        visibility: menuPosition ? "visible" : "hidden",
      }}
      className="z-40 min-w-44 bg-white rounded-xl border border-zinc-200 shadow-lg py-1.5 text-left"
    >
      {visibleActions.map((action, index) => {
        const isDisabled =
          typeof action.disabled === "function"
            ? action.disabled(item)
            : Boolean(action.disabled);
        const variant = action.variant ?? "default";
        const baseItemClass = `w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none ${variantClasses[variant]}`;

        const href =
          typeof action.href === "function" ? action.href(item) : action.href;

        return (
          <div key={index}>
            {action.dividerBefore && index > 0 && (
              <div className="my-1 border-t border-zinc-100" />
            )}

            {href && !isDisabled ? (
              <Link
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={baseItemClass}
              >
                {action.icon && <span className="shrink-0">{action.icon}</span>}
                <span>{action.label}</span>
              </Link>
            ) : (
              <button
                type="button"
                role="menuitem"
                disabled={isDisabled}
                onClick={() => {
                  setOpen(false);
                  if (action.confirm) {
                    setPendingAction(action);
                  } else {
                    action.onClick?.(item);
                  }
                }}
                className={baseItemClass}
              >
                {action.icon && <span className="shrink-0">{action.icon}</span>}
                <span>{action.label}</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  const modalContent = pendingAction?.confirm && mounted && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl border border-zinc-200 max-w-sm w-full p-5 shadow-xl space-y-4 text-left">
        <h3 className="text-sm font-bold text-zinc-900">
          {pendingAction.confirm.title ?? "Confirmar ação"}
        </h3>
        <p className="text-xs text-zinc-600 leading-relaxed whitespace-normal">
          {typeof pendingAction.confirm.description === "function"
            ? pendingAction.confirm.description(item)
            : pendingAction.confirm.description}
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            disabled={isExecuting}
            onClick={() => setPendingAction(null)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={isExecuting}
            onClick={handleConfirmExecution}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg text-white disabled:opacity-50 ${
              pendingAction.variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#307FE2] hover:bg-[#2568bd]"
            }`}
          >
            {isExecuting
              ? pendingAction.confirm.loadingLabel ?? "Processando..."
              : pendingAction.confirm.confirmLabel ?? "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="inline-flex justify-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        title={triggerTitle}
        className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl transition-all shadow-sm active:scale-95"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {mounted && createPortal(menuContent, document.body)}
      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}