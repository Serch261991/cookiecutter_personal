import http from "@/http/HttpClient";

export default class ActivityService{

    getAll() {
        return http.get(`/Activity/actividades/`);
    }

    getCanceled() {
        return http.get(`/Activity/actividades/cancelados`);
    }
}