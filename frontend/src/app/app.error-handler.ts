import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { SnackbarService } from "@shared/services/snackbar.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(
        private snackbarService: SnackbarService,
        private ngZone: NgZone
        ) {
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if(errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message
            this.ngZone.run(()=>{
                switch(errorResponse.status) {
                    case 401:
                        this.snackbarService.popupBottom(message || '')
                        break;
                    case 403:
                        this.snackbarService.popupBottom(message || 'Não autorizado.')
                        break;
                    case 404:
                        this.snackbarService.popupBottom(message || 'Recurso não encontrado.')
                        break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}