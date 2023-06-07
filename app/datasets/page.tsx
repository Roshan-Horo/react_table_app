import { Recipe, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Recipe[]> {
  // Fetch data from your API here.

  const res = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function DemoPage() {
  const data = await getData()
  console.log('data : ', data)
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
