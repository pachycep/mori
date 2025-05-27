import { format } from 'date-fns'

export function getNext7Days(baseDate = new Date()) {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(baseDate)
    d.setDate(baseDate.getDate() + i)
    return {
      day: format(d, 'EEE'),
      date: format(d, 'd'),
      fullDate: d, // 필요시 원본 Date도 포함
    }
  })
}
