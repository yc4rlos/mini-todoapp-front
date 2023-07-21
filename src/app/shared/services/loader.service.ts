import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoaderService {

    public activeSubsject = new Subject<boolean>()

    public show(): void {
        this.activeSubsject.next(true);
    }

    public hide(): void {
        this.activeSubsject.next(false);
    }
}