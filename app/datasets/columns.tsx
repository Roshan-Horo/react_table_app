"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DataTableColumnHeader} from '@/components/column-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Recipe = {
  id: number,
  name: string,
  image: string,
  category: string,
  label: string,
  price: string,
  description: string,
  // amount: number
  // status: "pending" | "processing" | "success" | "failed"
  // email: string
}

export const columns: ColumnDef<Recipe>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const {label} = row.original
      const name: string = row.getValue("name")
 
      return <>
        {
          label
            ? 
            label === 'Spicy' || label === 'Hot'
             ? (<div>{name} <Badge variant={"destructive"}>{label}</Badge></div>)
             : (<div>{name} <Badge>{label}</Badge></div>)
            : (<div>{name}</div>)
        }
      </>
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const {name} = row.original
      const image: string = row.getValue("image")
 
      return (
        <Avatar>
          <AvatarImage src={image} alt="recipe image" />
          <AvatarFallback>{name.substring(0,1)}</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description")
      const formatted = (text: string, textLength: number) => {
        if(text.length ===  0 || text == null){
          return ""
        }
        if(text.length <= textLength){
          return text
        }
        text = text.substring(0, textLength);
        let last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
      }

      if(typeof description === 'string'){
        return <div>{`${formatted(description, 40)}`}</div>
      }
 
      return <div>{`${description}`}</div>
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>

      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  { accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const recipe = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${recipe.id}`)}
            >
              Copy Recipe ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
            <DropdownMenuItem>View Recipe details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
