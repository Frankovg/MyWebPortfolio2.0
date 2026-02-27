import { X } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div
        role="search"
        className={cn(
          "relative h-full w-1/3 max-600:w-full md:max-lg:w-full",
          className
        )}
      >
        <Input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          className="border-whiteText placeholder:text-whiteText placeholder:font-normal hover-table-buttons pr-8 [&::-webkit-search-cancel-button]:hidden"
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors cursor-pointer"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
