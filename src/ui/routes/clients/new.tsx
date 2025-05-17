import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clients/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clients/new"!</div>
}

// dialog로 만드렁야함
