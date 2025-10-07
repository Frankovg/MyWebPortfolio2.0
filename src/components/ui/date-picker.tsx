"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";


type DatePickerProps = {
  defaultValue?: Date;
  selectedDate?: Date;
  onChange: (date?: Date) => void;
};

export const DatePicker = ({
  defaultValue,
  selectedDate,
  onChange,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "pl-3 text-left font-normal",
            !defaultValue && "text-muted-foreground"
          )}
        >
          {defaultValue ? (
            format(defaultValue, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          autoFocus
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};
