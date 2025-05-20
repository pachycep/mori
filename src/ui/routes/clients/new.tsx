import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clients/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clients/new"!</div>
}

// dialog로 만드렁야함
// function ClientNewDialog() {
//   return (
//     <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Add New Client</DialogTitle>
//             <DialogDescription>
//               Enter the client's information below to add them to your client
//               list.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <label htmlFor="name" className="text-sm font-medium">
//                 Full Name
//               </label>
//               <Input id="name" placeholder="Enter client name" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="phone" className="text-sm font-medium">
//                 Phone Number
//               </label>
//               <Input id="phone" placeholder="(555) 123-4567" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="email" className="text-sm font-medium">
//                 Email (Optional)
//               </label>
//               <Input id="email" type="email" placeholder="client@example.com" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="tags" className="text-sm font-medium">
//                 Tags (Optional)
//               </label>
//               <Input id="tags" placeholder="Add tags separated by commas" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="notes" className="text-sm font-medium">
//                 Notes (Optional)
//               </label>
//               <Input id="notes" placeholder="Add any notes about this client" />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setShowAddDialog(false)}
//               className="!rounded-button"
//             >
//               Cancel
//             </Button>
//             <Button className="bg-amber-600 hover:bg-amber-700 !rounded-button">
//               Add Client
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//   )
// }
