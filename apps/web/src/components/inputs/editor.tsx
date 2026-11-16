import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { sanitizeFileName } from '@/helpers/sanitizeFileName';
import { cn } from '@/lib/utils';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Code,
  File as FileIcon,
  Heading as HeadingIcon,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Paperclip,
  Redo,
  Send,
  Strikethrough,
  Undo,
  X,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface IAttachedFile {
  extension: string;
  file: File;
  id: string;
  name: string;
  size: number;
}

interface IUploadedFilePayload {
  extension: string;
  id?: string;
  name: string;
  size: number;
  url?: string;
}

interface IExistingFile {
  extension: string;
  id: string;
  name: string;
  size: number;
  url: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface IProps {
  externalLogsIsOpen?: boolean;
  initialContent?: string;
  initialFiles?: IExistingFile[];
  isDisabled: boolean;
  onCancel?(): void;
  onSubmit(data: {
    content: string;
    files?: {
      extension: string;
      id?: string;
      name: string;
      size: number;
      url?: string;
    }[];
    filesToDelete?: {
      fileId: number;
    }[];
  }): void;
  onUpdate?(content: string): void;
  submitLabel?: string;
}

export default function CommentEditor({
  externalLogsIsOpen,
  initialContent,
  isDisabled,
  onCancel,
  onSubmit,
  onUpdate,
  submitLabel = 'Comentar',
}: IProps) {
  const [, forceUpdate] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState<IAttachedFile[]>([]);
  const [existingFiles, setExistingFiles] = useState<IExistingFile[]>([]);

  const handleRemoveExistingFile = ({ index }: { index: number }) => {
    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async () => {
    const html = editor.getHTML();

    const hasNoContentToSave =
      editor.isEmpty &&
      attachedFiles.length === 0 &&
      existingFiles.length === 0;

    if (hasNoContentToSave) {
      return;
    }

    const uploadedFiles: IUploadedFilePayload[] = [];

    for (const file of existingFiles) {
      uploadedFiles.push({
        extension: file.extension,
        id: String(file.id),
        name: sanitizeFileName(file.name),
        size: file.size,
        url: file.url,
      });
    }

    onSubmit({
      content: html,
      files: uploadedFiles,
    });

    setAttachedFiles([]);
    setExistingFiles([]);
    editor.commands.clearContent(true);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1],
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        defaultProtocol: 'https',
        isAllowedUri: (url, ctx) => {
          return ctx.defaultValidate(url);
        },
      }),
    ],
    content: initialContent || '',
    editorProps: {
      handleKeyDown: (view, event) => {
        if (
          event.key === 'Enter' &&
          !event.shiftKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey &&
          editor?.isEditable
        ) {
          event.preventDefault();
          view.dom.closest('form')?.requestSubmit();
          return true;
        }

        return false;
      },
      attributes: {
        class:
          'min-h-[60px] max-h-[240px] overflow-y-auto w-full outline-none text-md text-gray-800 leading-relaxed ' +
          '[&_h1]:text-2xl [&_h1]:font-semibold ' +
          '[&_ul]:list-disc [&_ul]:pl-6 ' +
          '[&_ol]:list-decimal [&_ol]:pl-6 ' +
          '[&_li]:my-1 ' +
          '[&_pre]:bg-gray-200 [&_pre]:text-primary [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:font-mono [&_pre]:text-sm ' +
          '[&_img]:max-w-full [&_img]:rounded-md [&_img]:my-3 ',
      },
    },
    onSelectionUpdate: () => {
      forceUpdate((v) => v + 1);
    },
    onUpdate: () => {
      forceUpdate((v) => v + 1);
      if (onUpdate) {
        onUpdate(editor.getHTML());
      }
    },
  });

  const onClickBold = () => {
    editor.chain().focus().toggleBold().run();
    forceUpdate((v) => v + 1);
  };

  const onClickItalic = () => {
    editor.chain().focus().toggleItalic().run();
    forceUpdate((v) => v + 1);
  };

  const onClickStrike = () => {
    editor.chain().focus().toggleStrike().run();
    forceUpdate((v) => v + 1);
  };

  const onClickHeading = () => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
    forceUpdate((v) => v + 1);
  };

  const onClickCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
    forceUpdate((v) => v + 1);
  };

  const onClickBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
    forceUpdate((v) => v + 1);
  };

  const onClickOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
    forceUpdate((v) => v + 1);
  };

  const onClickUndo = () => {
    editor.chain().focus().undo().run();
    forceUpdate((v) => v + 1);
  };

  const onClickRedo = () => {
    editor.chain().focus().redo().run();
    forceUpdate((v) => v + 1);
  };

  const onClickImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
        forceUpdate((v) => v + 1);
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  const onClickFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*/*';

    input.onchange = () => {
      const files = input.files;
      if (!files) return;

      const newFiles = Array.from(files).map((file) => {
        const nameParts = file.name.split('.');
        const extension = nameParts.pop() || '';
        const name = nameParts.join('.') || file.name;
        return {
          id: uuidv4(),
          name,
          extension,
          size: file.size,
          file,
        };
      });

      setAttachedFiles((prev) => [...prev, ...newFiles]);
    };

    input.click();
  };

  const onClickLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL do link', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      forceUpdate((v) => v + 1);
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
    forceUpdate((v) => v + 1);
  };

  const allFilesCount = existingFiles.length + attachedFiles.length;

  useEffect(() => {
    if (editor && initialContent !== undefined) {
      editor.commands.setContent(initialContent || '');
    }
  }, [editor, initialContent]);

  useEffect(() => {
    editor?.setEditable(!isDisabled);
  }, [editor, isDisabled]);

  if (!editor) return null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
      <div
        className={cn(
          'focus-within:ring-fuchsia-500 w-[60%] rounded-lg border bg-white p-4 focus-within:ring-2 focus-within:border-transparent',
          externalLogsIsOpen ? 'w-[55%]' : 'w-full',
        )}>
        <div className="mb-3 flex items-start gap-3">
          <div className="flex-1 break-all">
            <EditorContent editor={editor} />
          </div>
        </div>

        {allFilesCount > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {existingFiles.map((file, index) => (
              <div
                className="bg-accent flex items-center gap-2 rounded-md px-3 py-2"
                key={`existing-${index}`}>
                <FileIcon className="text-muted-foreground size-5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {file.name}.{file.extension}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  className="text-muted-foreground hover:text-destructive ml-2 cursor-pointer"
                  onClick={() =>
                    handleRemoveExistingFile({
                      index,
                    })
                  }
                  type="button">
                  <X className="size-4" />
                </button>
              </div>
            ))}
            {attachedFiles.map((file) => (
              <div
                className="bg-accent flex items-center gap-2 rounded-md px-3 py-2"
                key={file.id}>
                <FileIcon className="text-muted-foreground size-5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {file.name}.{file.extension}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  className="text-muted-foreground hover:text-destructive ml-2 cursor-pointer"
                  onClick={() => handleRemoveFile(file.id)}
                  type="button">
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex flex-wrap gap-2">
            <Button
              className={
                editor.isActive('bold')
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickBold}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <Bold size={16} />
            </Button>

            <Button
              className={
                editor.isActive('italic')
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickItalic}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <Italic size={16} />
            </Button>

            <Button
              className={
                editor.isActive('strike')
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickStrike}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <Strikethrough size={16} />
            </Button>

            <Button
              className={
                editor.isActive('link')
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickLink}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <LinkIcon size={16} />
            </Button>

            <Button
              className={
                editor.isActive('heading', { level: 1 })
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickHeading}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <HeadingIcon size={16} />
            </Button>

            <Button
              className={
                editor.isActive('codeBlock')
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickCodeBlock}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <Code size={16} />
            </Button>

            <Button
              className={
                editor.isActive('bulletList')
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickBulletList}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <List size={16} />
            </Button>

            <Button
              className={
                editor.isActive('orderedList')
                  ? 'bg-primary text-background cursor-pointer'
                  : 'text-primary hover:text-background cursor-pointer bg-transparent'
              }
              onClick={onClickOrderedList}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <ListOrdered size={16} />
            </Button>

            <Button
              className="text-primary hover:text-background cursor-pointer bg-transparent"
              onClick={onClickImage}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <ImageIcon size={16} />
            </Button>

            <Button
              className="text-primary hover:text-background cursor-pointer bg-transparent"
              onClick={onClickFile}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <Paperclip size={16} />
            </Button>

            <Button
              className="text-primary hover:text-background cursor-pointer bg-transparent"
              onClick={onClickUndo}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <Undo size={16} />
            </Button>

            <Button
              className="text-primary hover:text-background cursor-pointer bg-transparent"
              onClick={onClickRedo}
              onMouseDown={(e) => e.preventDefault()}
              size="icon"
              type="button">
              <Redo size={16} />
            </Button>
          </div>

          <Button
            className="rounded-md px-4 py-2 lg:hidden"
            onClick={handleSubmit}
            type="button">
            <Send size={16} />
          </Button>
          <div className="hidden gap-2 lg:flex">
            {onCancel && (
              <Button
                className="rounded-md px-4 py-2"
                onClick={onCancel}
                type="button"
                variant="outline">
                Cancelar
              </Button>
            )}
            {/* <Button
              className="rounded-md px-4 py-2"
              disabled={isDisabled}
              onClick={handleSubmit}
              type="button">
              {submitLabel}
            </Button> */}
          </div>
        </div>
      </div>
    </form>
  );
}
