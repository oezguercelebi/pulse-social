import React from 'react';
import { Button as RadixButton } from '@radix-ui/themes';
import type { ButtonProps as RadixButtonProps } from '@radix-ui/themes';

// Extended version of Radix Themes button with custom props
export interface ThemedButtonProps extends RadixButtonProps {
  isLoading?: boolean;
}

export const ThemedButton = React.forwardRef<
  React.ElementRef<typeof RadixButton>,
  ThemedButtonProps
>(({ children, isLoading, disabled, ...props }, ref) => {
  return (
    <RadixButton
      ref={ref}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </RadixButton>
  );
});

ThemedButton.displayName = 'ThemedButton'; 