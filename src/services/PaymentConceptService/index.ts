import http from "@/http/HttpClient";

export default class PaymentConceptService{

    findByEmployeeId(employeeId: number) {
        return http.get(`/EmployeePm/conceptos/${employeeId}`);
    }
}