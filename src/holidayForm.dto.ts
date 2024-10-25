export interface HolidayFormDto
{
    name: string,
    beginDate: string,
    endDate: string,
    payedTimeOff: string,
    empId: string,
    reason: string // min 30 karakter
}