import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors={true}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          title: 'text-lg',
          description:
            'group-[.toast]:text-background! text-base! font-regular!',
          toast:
            'py-2! group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:[&_svg]:size-5',
          success:
            'group-[.toaster]:bg-success! group-[.toaster]:text-success-foreground! group-[.toaster]:border-success!',
          error:
            'group-[.toaster]:bg-destructive! group-[.toaster]:text-destructive-foreground! group-[.toaster]:border-destructive!',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
