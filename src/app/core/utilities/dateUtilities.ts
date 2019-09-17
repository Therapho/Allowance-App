export class DateUtilities {
  public static getMonday(d): Date {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }
  public static addDays(date, days): Date {
    date = new Date(date);
    const diff = date.getDate() + days;
    return new Date(date.setDate(diff));

  }
}
