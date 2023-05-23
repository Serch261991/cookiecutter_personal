import http from "@/http/HttpClient";

export default class BeneficiaryPMService{

    findByEmployeeId(employeeId: number) {
        return http.get(`/EmployeePm/beneficiarios/${employeeId}`);
    }
}