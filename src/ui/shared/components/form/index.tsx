import { type AnyFieldApi, createFormHookContexts } from '@tanstack/react-form'
import { createFormHook } from '@tanstack/react-form'
import { Label } from '../label'
import { Input } from '../input'
import { Button } from '../button'
import { cn } from '../../utils/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select'
import { Textarea } from '../textarea'
import { CalendarInput } from '../calendar-input'

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
  },
  formComponents: {
    SubscribeButton,
  },
})
