import { Customer, NewTreatment, Treatment } from '@/types/supabase'
import { Button } from '@/ui/shared/components/button'
import { Input } from '@/ui/shared/components/input'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { useState } from 'react'

export const Route = createFileRoute('/treatments/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>CreateTreatment</div>
}

// function CreateTreatment() {
//   // FIXME: navigate로 변경
//   const [showAddDialog, setShowAddDialog] = useState(false)

//   const handleFileUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     type: 'before' | 'after',
//   ) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setNewRecord({
//           ...newRecord,
//           [type === 'before' ? 'beforeImage' : 'image']:
//             reader.result as string,
//         })
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const resetForm = () => {
//     setNewRecord({
//       date: format(new Date(), 'yyyy-MM-dd'),
//       customer: null,
//       services: [],
//       styleTags: [],
//       notes: '',
//       beforeImage: '',
//       image: '',
//     })
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return format(date, 'MMM d, yyyy')
//   }

//   const getServiceIcon = (service: string) => {
//     switch (service.toLowerCase()) {
//       case 'haircut':
//         return 'fa-solid fa-scissors'
//       case 'color':
//         return 'fa-solid fa-palette'
//       case 'treatment':
//         return 'fa-solid fa-pump-soap'
//       case 'blowout':
//         return 'fa-solid fa-fan'
//       case 'updo':
//         return 'fa-solid fa-up-long'
//       default:
//         return 'fa-solid fa-spa'
//     }
//   }

//   return (
//     <div
//       className={`fixed inset-0 bg-white z-50 ${showAddDialog ? 'block' : 'hidden'}`}
//     >
//       <header className="fixed top-0 w-full bg-white border-b border-neutral-100 z-50">
//         <div className="px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
//               onClick={() => {
//                 setShowAddDialog(false)
//                 setNewRecord({
//                   date: format(new Date(), 'yyyy-MM-dd'),
//                   customer: null,
//                   services: [],
//                   styleTags: [],
//                   notes: '',
//                   beforeImage: '',
//                   image: '',
//                 })
//               }}
//             >
//               <i className="fa-solid fa-arrow-left"></i>
//             </button>
//             <h1 className="text-lg font-medium text-neutral-800">
//               New Treatment
//             </h1>
//             <button className="p-2 -mr-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors opacity-0">
//               <i className="fa-solid fa-arrow-left"></i>
//             </button>
//           </div>
//         </div>
//       </header>
//       <main className="pt-[72px] pb-[88px] px-4 overflow-y-auto h-full">
//         <div className="space-y-6 max-w-md mx-auto">
//           <div>
//             <label className="text-sm font-medium text-neutral-700 mb-1.5 block">
//               Client
//             </label>
//             <div className="flex gap-2">
//               <select
//                 className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
//                 value={newRecord.customer?.id || ''}
//                 onChange={(e) => {
//                   const selectedCustomer =
//                     treatmentRecords.find(
//                       (r) => r.customer.id === parseInt(e.target.value),
//                     )?.customer || null
//                   setNewRecord({ ...newRecord, customer: selectedCustomer })
//                 }}
//               >
//                 <option value="">Select a client</option>
//                 {Array.from(
//                   new Set(treatmentRecords.map((r) => r.customer.id)),
//                 ).map((id) => {
//                   const customer = treatmentRecords.find(
//                     (r) => r.customer.id === id,
//                   )?.customer
//                   return (
//                     customer && (
//                       <option key={customer.id} value={customer.id}>
//                         {customer.name}
//                       </option>
//                     )
//                   )
//                 })}
//               </select>
//               <Button variant="outline" className="shrink-0 !rounded-button">
//                 <i className="fa-solid fa-plus mr-2" />
//                 New Client
//               </Button>
//             </div>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-neutral-700 mb-1.5 block">
//               Date
//             </label>
//             <Input
//               type="date"
//               value={newRecord.date}
//               onChange={(e) =>
//                 setNewRecord({ ...newRecord, date: e.target.value })
//               }
//               className="bg-white"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium text-neutral-700 mb-1.5 block">
//               Services
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {['Haircut', 'Color', 'Treatment', 'Blowout', 'Updo'].map(
//                 (service) => (
//                   <Badge
//                     key={service}
//                     variant="outline"
//                     className={`cursor-pointer px-3 py-1.5 !rounded-button ${
//                       newRecord.services.includes(service)
//                         ? 'bg-amber-100 text-amber-800 border-amber-200'
//                         : 'bg-white text-neutral-700 hover:bg-neutral-100'
//                     }`}
//                     onClick={() => {
//                       setNewRecord({
//                         ...newRecord,
//                         services: newRecord.services.includes(service)
//                           ? newRecord.services.filter((s) => s !== service)
//                           : [...newRecord.services, service],
//                       })
//                     }}
//                   >
//                     <i className={`${getServiceIcon(service)} mr-2`}></i>
//                     {service}
//                   </Badge>
//                 ),
//               )}
//             </div>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-neutral-700 mb-1.5 block">
//               Style Tags
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {styleFilters.map((tag) => (
//                 <Badge
//                   key={tag}
//                   variant="outline"
//                   className={`cursor-pointer px-3 py-1.5 !rounded-button ${
//                     newRecord.styleTags.includes(tag)
//                       ? 'bg-amber-100 text-amber-800 border-amber-200'
//                       : 'bg-white text-neutral-700 hover:bg-neutral-100'
//                   }`}
//                   onClick={() => {
//                     setNewRecord({
//                       ...newRecord,
//                       styleTags: newRecord.styleTags.includes(tag)
//                         ? newRecord.styleTags.filter((t) => t !== tag)
//                         : [...newRecord.styleTags, tag],
//                     })
//                   }}
//                 >
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-neutral-700 mb-1.5 block">
//               Notes
//             </label>
//             <textarea
//               className="flex min-h-[100px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
//               placeholder="Add treatment notes..."
//               value={newRecord.notes}
//               onChange={(e) =>
//                 setNewRecord({ ...newRecord, notes: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium text-neutral-700 mb-1.5 block">
//               Photos
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <div className="text-xs text-neutral-500 mb-1.5">Before</div>
//                 <div className="relative aspect-[3/4] rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center">
//                   {newRecord.beforeImage ? (
//                     <img
//                       src={newRecord.beforeImage}
//                       alt="Before"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="text-center p-4">
//                       <i className="fa-solid fa-camera text-2xl text-neutral-400 mb-2"></i>
//                       <div className="text-xs text-neutral-500">
//                         Upload before photo
//                       </div>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0]
//                       if (file) {
//                         const reader = new FileReader()
//                         reader.onloadend = () => {
//                           setNewRecord({
//                             ...newRecord,
//                             beforeImage: reader.result as string,
//                           })
//                         }
//                         reader.readAsDataURL(file)
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs text-neutral-500 mb-1.5">After</div>
//                 <div className="relative aspect-[3/4] rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center">
//                   {newRecord.image ? (
//                     <img
//                       src={newRecord.image}
//                       alt="After"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="text-center p-4">
//                       <i className="fa-solid fa-camera text-2xl text-neutral-400 mb-2"></i>
//                       <div className="text-xs text-neutral-500">
//                         Upload after photo
//                       </div>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0]
//                       if (file) {
//                         const reader = new FileReader()
//                         reader.onloadend = () => {
//                           setNewRecord({
//                             ...newRecord,
//                             image: reader.result as string,
//                           })
//                         }
//                         reader.readAsDataURL(file)
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <footer className="fixed bottom-0 w-full bg-white border-t border-neutral-100 p-4 z-50">
//         <Button
//           className="w-full !rounded-button"
//           disabled={
//             !newRecord.customer ||
//             newRecord.services.length === 0 ||
//             !newRecord.image
//           }
//           onClick={() => {
//             // Here you would typically save the record to your backend
//             setShowAddDialog(false)
//             setNewRecord({
//               date: format(new Date(), 'yyyy-MM-dd'),
//               customer: null,
//               services: [],
//               styleTags: [],
//               notes: '',
//               beforeImage: '',
//               image: '',
//             })
//           }}
//         >
//           Save Treatment Record
//         </Button>
//       </footer>
//     </div>
//   )
// }
