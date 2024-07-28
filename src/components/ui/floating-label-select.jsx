import * as React from 'react';

import { cn } from '@/lib/utils';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const FloatingSelect = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Select
      placeholder=" "
      className={cn('peer', className)}
      ref={ref}
      {...props}
    />
  );
});
FloatingSelect.displayName = 'FloatingSelect';

const FloatingLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = 'FloatingLabel';

const FloatingLabelSelect = React.forwardRef(({ id, label, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingSelect ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  );
});
FloatingLabelSelect.displayName = 'FloatingLabelSelect';

export { FloatingSelect, FloatingLabel, FloatingLabelSelect };
