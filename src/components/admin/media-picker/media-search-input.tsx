import { SearchInput } from "@/components/primitives/search-input"

type MediaSearchInputProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
}

export const MediaSearchInput = ({ value, onChange, className }: MediaSearchInputProps) => {
  return (
    <SearchInput
      placeholder="Search images..."
      value={value}
      onChange={onChange}
      className={className}
    />
  )
}
