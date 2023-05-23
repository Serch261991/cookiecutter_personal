import http from "@/http/HttpClient";
import type { AppFile } from "./types";


export default class FileService{

    findFilesByRequest(requestId: number){
        return http.get(`/AppFile/tramite/${requestId}/files`);
    }

    savdFileRequest(requestId:number, appFile: AppFile){
        return http.post(`/AppFile/tramite/${requestId}/files`, appFile);
    }

    deleteFileRequest(appFileId: number){
        return http.put(`/AppFile/${appFileId}`);
    }

    updateFileRequestValidation(reqFileId: number, validationFlag: string){
        return http.put(`/AppFile/validation/${reqFileId}/${validationFlag}`);
    }

    uploadFile(file: string, requestId: number, appFileId: number) {
        
        const formData = new FormData();
        formData.append('file', file);

        return http.post(`/AppFile/save/${requestId}/${appFileId}`, formData, {
          headers: {"Content-Type": "multipart/form-data"},
        });
       
   }

   downloadFile(requestId: number, fileName: string) {

    return http({
        url:`/AppFile/download/${requestId}/${fileName}/downloadFile`,
        method : 'GET',
        responseType: 'blob',
    });
   }
}