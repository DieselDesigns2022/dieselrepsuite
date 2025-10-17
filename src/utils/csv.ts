import Papa from 'papaparse'
export function parseCSV(text:string){
  const res = Papa.parse(text, { header:true, skipEmptyLines:true })
  if(res.errors.length) throw new Error(res.errors[0].message)
  return res.data as Array<Record<string,string>>
}