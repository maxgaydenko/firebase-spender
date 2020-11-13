export const dateToString = (d: Date): string => {
 return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const dateStringConvert = (date: string): string => {
 const d = date.split("-");
 return d.length === 3 ? `${d[2]}.${d[1]}.${d[0]}` : date;
}