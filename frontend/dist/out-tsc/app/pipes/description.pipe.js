import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let DescriptionPipe = class DescriptionPipe {
    transform(value, length) {
        return value.split(" ").slice(0, length).join(" ") + "...";
    }
};
DescriptionPipe = __decorate([
    Pipe({
        name: 'description'
    })
], DescriptionPipe);
export { DescriptionPipe };
