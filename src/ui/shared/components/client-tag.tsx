import { Badge } from './badge'

export function ClientTag({ tag }: { tag: string }) {
  return (
    <Badge
      variant="outline"
      className={`${getTagColor(tag)} text-xs px-1.5 py-0.5`}
    >
      {tag}
    </Badge>
  )
}

const getTagColor = (tag: string): string => {
  const tagColors: Record<string, string> = {
    VIP: 'bg-purple-100 text-purple-800 border-purple-200',
    Premium: 'bg-amber-100 text-amber-800 border-amber-200',
    'New Client': 'bg-green-100 text-green-800 border-green-200',
    Referral: 'bg-blue-100 text-blue-800 border-blue-200',
    Monthly: 'bg-pink-100 text-pink-800 border-pink-200',
    'Bi-weekly': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Bi-monthly': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    Quarterly: 'bg-orange-100 text-orange-800 border-orange-200',
    'Student Discount': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Early Bird': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Color Client': 'bg-rose-100 text-rose-800 border-rose-200',
    'Curly Specialist': 'bg-violet-100 text-violet-800 border-violet-200',
    'Blonde Specialist': 'bg-amber-100 text-amber-800 border-amber-200',
    'Extension Specialist':
      'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    'Product Buyer': 'bg-teal-100 text-teal-800 border-teal-200',
    'Tech Industry': 'bg-sky-100 text-sky-800 border-sky-200',
  }
  return tagColors[tag] || 'bg-gray-100 text-gray-800 border-gray-200'
}
