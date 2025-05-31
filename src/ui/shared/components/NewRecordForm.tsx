import { formOptions, useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { z } from 'zod'

interface FormValues {
  date: string
  service: string
  is_public: boolean
  customer?: string
  memo?: string
  images?: File | null
}

const defaultValues: FormValues = {
  date: new Date().toISOString().split('T')[0],
  is_public: false,
  service: '',
}

const formOpts = formOptions({
  defaultValues,
})

export const NewRecordForm = () => {
  const [preview, setPreview] = useState<string | null>(null)

  const form = useForm({
    ...formOpts,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setFieldValue('images', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4 max-w-md mx-auto p-4"
    >
      <form.Field
        name="date"
        validators={{
          onChange: z.string(),
        }}
      >
        {(field) => (
          <label>
            날짜
            <input
              type="date"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full border p-2"
            />
          </label>
        )}
      </form.Field>

      <form.Field
        name="customer"
        validators={{
          onChange: z.string().optional(),
        }}
      >
        {(field) => (
          <label>
            고객명
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full border p-2"
            />
          </label>
        )}
      </form.Field>

      <form.Field
        name="service"
        validators={{
          onChange: z.string().min(1, '시술명을 입력해주세요'),
        }}
      >
        {(field) => (
          <label>
            시술명 <span className="text-red-500">*</span>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full border p-2"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-red-500 text-sm">
                {field.state.meta.errors[0]}
              </p>
            )}
          </label>
        )}
      </form.Field>

      <form.Field
        name="memo"
        validators={{
          onChange: z.string().optional(),
        }}
      >
        {(field) => (
          <label>
            메모
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={4}
              className="w-full border p-2"
            />
          </label>
        )}
      </form.Field>

      <label>
        이미지 업로드
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block mt-1"
        />
        {preview && (
          <img src={preview} alt="preview" className="mt-2 h-32 object-cover" />
        )}
      </label>

      <form.Field
        name="is_public"
        validators={{
          onChange: z.boolean(),
        }}
      >
        {(field) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            <span>공개 포트폴리오에 포함</span>
          </label>
        )}
      </form.Field>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        기록 저장
      </button>
    </form>
  )
}
