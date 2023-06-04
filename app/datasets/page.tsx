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
  // return [
  //   {
  //     id: "m5gr84i9",
  //     amount: 316,
  //     status: "success",
  //     email: "ken99@yahoo.com",
  //   },
  //   {
  //     id: "3u1reuv4",
  //     amount: 242,
  //     status: "success",
  //     email: "Abe45@gmail.com",
  //   },
  //   {
  //     id: "derv1ws0",
  //     amount: 837,
  //     status: "processing",
  //     email: "Monserrat44@gmail.com",
  //   },
  //   {
  //     id: "5kma53ae",
  //     amount: 874,
  //     status: "success",
  //     email: "Silas22@gmail.com",
  //   },
  //   {
  //     id: "bhqecj4p",
  //     amount: 721,
  //     status: "failed",
  //     email: "carmella@hotmail.com",
  //   },
  //   {
  //     id: "01",
  //     amount: 316,
  //     status: "success",
  //     email: "ken99@yahoo.com",
  //   },
  //   {
  //     id: "02",
  //     amount: 242,
  //     status: "success",
  //     email: "Abe45@gmail.com",
  //   },
  //   {
  //     id: "03",
  //     amount: 837,
  //     status: "processing",
  //     email: "Monserrat44@gmail.com",
  //   },
  //   {
  //     id: "05",
  //     amount: 874,
  //     status: "success",
  //     email: "Silas22@gmail.com",
  //   },
  //   {
  //     id: "06",
  //     amount: 721,
  //     status: "failed",
  //     email: "carmella@hotmail.com",
  //   },
  //   {
  //     id: "07",
  //     amount: 316,
  //     status: "success",
  //     email: "ken99@yahoo.com",
  //   },
  //   {
  //     id: "08",
  //     amount: 242,
  //     status: "success",
  //     email: "Abe45@gmail.com",
  //   },
  //   {
  //     id: "09",
  //     amount: 837,
  //     status: "processing",
  //     email: "Monserrat44@gmail.com",
  //   },
  //   {
  //     id: "10",
  //     amount: 874,
  //     status: "success",
  //     email: "Silas22@gmail.com",
  //   },
  //   {
  //     id: "11",
  //     amount: 721,
  //     status: "failed",
  //     email: "carmella@hotmail.com",
  //   },
  // ]
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
