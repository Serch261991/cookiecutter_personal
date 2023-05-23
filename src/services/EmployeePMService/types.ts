export interface EmployeePmData
{
    employeeId: number;
    name: string;
    lastName1: string;
    lastName2: string;
    fullName: string;
    regime: string;
    pensionType: string;
    deceaseDate: string;
    companyName: string;
    centerId: number;
    departamentId:number;
    departamentName: string;
    attentionCenterId: string;
    attentionCenterName: string;
    grrhrl: string;
    sap: string;
    beginDate: string;
    paymentDate: string;
    
}

export interface FixPaymentRequest
{
    id: number;
    typeId: number;
    activityId: number;
    employeeId: number;
    name: string;
    regime: string;
    pensionType: string;
    deceaseDate: string;
    beginDate: string;
    paymentDate: string;
    numDaysMin: number;
    numDays: number;
    companyName: string;
    departament: string;
    region: string;
    sap: string;
    attentionCenter: string;
    designatedEmployeeId: number;
    designatedEmployeeName: string;
    designatedEmployeeAddress: string;
}