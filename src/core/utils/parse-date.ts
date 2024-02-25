export function parseDateStringToISO(
  dateString: string,
  endOfDay: boolean = false,
): string {
  const [day, month, year] = dateString.split('/');
  const isoDate = new Date(
    `${year}-${month}-${day}${endOfDay ? 'T23:59:59' : ''}`,
  ).toISOString();
  return isoDate;
}
