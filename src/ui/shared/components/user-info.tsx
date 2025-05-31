import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export function UserInfo({
  name,
  imageUrl,
  phone,
}: { name: string; imageUrl: string; phone: string }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-12 rounded-full">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>
          {name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-base text-neutral-900 truncate">{name}</p>
        <p className="text-xs text-neutral-400">{phone}</p>
      </div>
    </div>
  )
}
