import { EventEmitter } from "@angular/core"

export class VehicleSnackbarService {
    notifier = new EventEmitter<string>()

    notify(message: string) {
        this.notifier.emit(message)
    }
}