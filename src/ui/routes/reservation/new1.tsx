import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reservation/d')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reservation/d"!</div>
}
