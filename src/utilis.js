export function dateFormat(date){
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "GMT"
      };
    
    const format = new Intl.DateTimeFormat("en-GB", options)
    return format.format(new Date(date)) + " GMT"
}