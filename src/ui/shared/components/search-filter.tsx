import { Badge } from './badge'
import { Button } from './button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from './dialog'
import { DialogTitle } from './dialog'
import { DialogHeader } from './dialog'
import { DialogContent } from './dialog'
import { Input } from './input'
// import { useState } from 'react'

export function SearchFilter({
  value,
  onChange,
  // filterValues,
  // filterOptions,
  // onSelectFilter,
}: {
  value: string
  onChange: (value: string) => void
  // filterValues: string[]
  // filterOptions: string[]
  // onSelectFilter: (filter: string[]) => void
}) {
  return (
    <>
      <div className="flex gap-2 mb-1">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i className="fa-solid fa-search text-neutral-400" />
          </div>
          <Input
            type="search"
            placeholder="Search by client or style..."
            className="pl-10 pr-4 py-2 bg-white border-neutral-200"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        {/* <FilterDialog
        filterValues={filterValues}
        filterOptions={filterOptions}
        onFilterSelect={onSelectFilter}
      /> */}
      </div>

      {/* <FilterChipList
        filterValues={filterValues}
        onSelectFilter={onSelectFilter}
      /> */}
    </>
  )
}

function FilterChipList({
  filterValues,
  onSelectFilter,
}: {
  filterValues: string[]
  onSelectFilter: (filter: string[]) => void
}) {
  const onRemoveFilter = (filter: string) => {
    onSelectFilter(filterValues.filter((f) => f !== filter))
  }

  return (
    <>
      {filterValues.map((filter) => (
        <FilterChip key={filter} filter={filter} onRemove={onRemoveFilter} />
      ))}
    </>
  )
}

function FilterChip({
  filter,
  onRemove,
}: {
  filter: string
  onRemove: (filter: string) => void
}) {
  return (
    <div className="flex items-center mt-2">
      <Badge className="bg-amber-100 text-amber-800 border-0 flex items-center gap-1 px-3 py-1">
        {filter}
        <Button
          variant="ghost"
          className="ml-1 text-amber-800 hover:text-amber-900"
          onClick={() => onRemove(filter)}
        >
          <i className="fa-solid fa-xmark" />
        </Button>
      </Badge>
    </div>
  )
}

function FilterDialog({
  filterValues,
  filterOptions,
  onFilterSelect,
}: {
  filterValues: string[]
  filterOptions: string[]
  onFilterSelect: (filter: string[]) => void
}) {
  const onSelect = (filter: string) => {
    const newFilters = filterValues.includes(filter)
      ? filterValues.filter((f) => f !== filter)
      : [...filterValues, filter]

    onFilterSelect(newFilters)
  }

  const onClear = () => {
    onFilterSelect([])
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="border-neutral-200 bg-white !rounded-button"
        >
          <i className="fa-solid fa-filter mr-2 text-neutral-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter by Style</DialogTitle>
          <DialogDescription className="text-neutral-500">
            Select a style tag to filter your treatment history.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 py-4">
          {filterOptions.map((filter) => (
            <Badge
              key={filter}
              variant="outline"
              className={`cursor-pointer px-3 py-1.5 !rounded-button ${
                filterValues.includes(filter)
                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => onSelect(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClear} className="!rounded-button">
            Clear
          </Button>
          <DialogClose asChild>Apply</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
