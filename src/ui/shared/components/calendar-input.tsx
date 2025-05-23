'use client'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Calendar } from './calendar'

interface CalendarInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  disabledDates?: (date: Date) => boolean
}

export function CalendarInput({
  value,
  onChange,
  disabled = false,
  placeholder = '날짜를 선택하세요',
  className,
  disabledDates,
}: CalendarInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] pl-3 text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
          disabled={disabled}
        >
          {value ? format(value, 'PPP') : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabledDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
