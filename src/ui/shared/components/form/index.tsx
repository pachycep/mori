import { type AnyFieldApi, createFormHookContexts } from '@tanstack/react-form'
import { createFormHook } from '@tanstack/react-form'
import { cn } from '../../utils/cn'
import { Badge } from '../badge'
import { Button } from '../button'
import { CalendarInput } from '../calendar-input'
import { Input } from '../input'
import { Label } from '../label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select'
import { Textarea } from '../textarea'

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()

  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldError field={field} />
    </FieldContainer>
  )
}

function FileInputField({ label }: { label: string }) {
  const field = useFieldContext<string>()

  // TODO: 파일 업로드 기능 추가
  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Input
        type="file"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldError field={field} />
    </FieldContainer>
  )
}

function SelectField({
  label,
  options,
  placeholder,
}: {
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
}) {
  const field = useFieldContext<string>()

  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Select value={field.state.value} onValueChange={field.handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder || '선택하세요'} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError field={field} />
    </FieldContainer>
  )
}

function TextareaField({
  label,
  placeholder,
}: { label: string; placeholder?: string }) {
  const field = useFieldContext<string>()

  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
      />
      <FieldError field={field} />
    </FieldContainer>
  )
}

function BadgeField({
  label,
  options,
}: { label: string; options: { value: string; label: string }[] }) {
  const field = useFieldContext<string[]>()

  const value = field.state.value
  const onClick = (option: string) => {
    field.handleChange(
      value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option],
    )
  }
  return (
    <FieldContainer>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Badge
            key={opt.value}
            variant="outline"
            className={cn(
              'cursor-pointer',
              value.includes(opt.value)
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-white text-neutral-700 hover:bg-neutral-100',
            )}
            onClick={() => onClick(opt.value)}
          >
            {opt.label}
          </Badge>
        ))}
      </div>
    </FieldContainer>
  )
}

function CalendarField({
  label,
  placeholder,
}: { label: string; placeholder?: string }) {
  const field = useFieldContext<string>()

  return (
    <FieldContainer>
      <Label>{label}</Label>
      <CalendarInput
        value={field.state.value ? new Date(field.state.value) : undefined}
        onChange={(value) => {
          if (value) {
            field.handleChange(value.toISOString())
          }
        }}
        disabledDates={(date) => date < new Date()}
        placeholder={placeholder}
      />
      <FieldError field={field} />
    </FieldContainer>
  )
}

function TimeSlotField() {
  const field = useFieldContext<string>()
}

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe
      selector={({ isSubmitting, canSubmit }) => [isSubmitting, canSubmit]}
    >
      {([isSubmitting, canSubmit]) => (
        <Button type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
          {isSubmitting ? 'Submitting...' : label}
        </Button>
      )}
    </form.Subscribe>
  )
}

function FieldContainer({
  className,
  children,
}: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex flex-col gap-1', className)}>{children}</div>
}

function FieldError({ field }: { field: AnyFieldApi }) {
  const isValid = field.state.meta.isValid
  const errorMessages = field.state.meta.errors
    .map((err) => err.message)
    .join(',')

  if (isValid) return null

  return <p className="text-red-500 text-sm">{errorMessages}</p>
}

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
    TextareaField,
    CalendarField,
    BadgeField,
    FileInputField,
  },
  formComponents: {
    SubscribeButton,
  },
})
