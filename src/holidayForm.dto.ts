export interface HolidayFormDto
{
    name: string,
    beginDate: string,
    endDate: string,
    payedTimeOff: boolean,
    empId: string,
    reason: string // min 30 karakter
}