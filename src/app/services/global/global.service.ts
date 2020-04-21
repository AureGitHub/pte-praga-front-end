import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
    timeout: any;
    KeySecure = 'authorization';

    public getKeySecure() {
        return 'authorization';
    }
}
