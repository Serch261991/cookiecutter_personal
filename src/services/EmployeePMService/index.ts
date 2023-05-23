import http from "@/http/HttpClient";
import type { FixPaymentRequest } from "./types";

export default class EmployeePMService{

    findByEmployeeId(employeeId: number) {
        return http.get(`/EmployeePm/${employeeId}`);
    }

    saveFixPaymentRequest(fixPaymentRequest: FixPaymentRequest){
        return http.post('/EmployeePm/solicitud/registra',fixPaymentRequest);
    }

    findFixPaymentRequest(requestId: number){
        return http.get(`/EmployeePm/solicitud/${requestId}`);
    }

    findFixPaymentRequestByActivity(activityId: number){
        return http.get(`/EmployeePm/solicitud/activities/${activityId}`);
    }

    updateNextStatus(fixPaymentRequest: FixPaymentRequest){
        return http.put('/EmployeePm/solicitud/actualiza',fixPaymentRequest);
    }

    updatePreviousStatus(fixPaymentRequest: FixPaymentRequest){
        return http.put('/EmployeePm/solicitud/actualiza',fixPaymentRequest);
    }

    findNameByEmployeeId(employeeId: number) {
        return http.get(`/EmployeePm/employee/name/${employeeId}`);
    }

    saveDesignatedEmployee(requestId: number, designatedEmployeeId: number, designatedEmployeeName: string, designatedEmployeeAddress: string){
        return http.put(`/EmployeePm/solicitud/empleado_cheque/actualiza/${requestId}`,
        {designatedEmployeeId: designatedEmployeeId, designatedEmployeeName: designatedEmployeeName, designatedEmployeeAddress: designatedEmployeeAddress});
    }

    countByEmployeeId(employeeId: number) {
        return http.get(`/EmployeePm/solicitud/employee/${employeeId}`);
    }

}