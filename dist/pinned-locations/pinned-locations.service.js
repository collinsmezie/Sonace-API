"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinnedLocationsService = void 0;
const common_1 = require("@nestjs/common");
let PinnedLocationsService = class PinnedLocationsService {
    create(createPinnedLocationDto) {
        return 'This action adds a new pinnedLocation';
    }
    findAll() {
        return `This action returns all pinnedLocations`;
    }
    findOne(id) {
        return `This action returns a #${id} pinnedLocation`;
    }
    update(id, updatePinnedLocationDto) {
        return `This action updates a #${id} pinnedLocation`;
    }
    remove(id) {
        return `This action removes a #${id} pinnedLocation`;
    }
};
exports.PinnedLocationsService = PinnedLocationsService;
exports.PinnedLocationsService = PinnedLocationsService = __decorate([
    (0, common_1.Injectable)()
], PinnedLocationsService);
//# sourceMappingURL=pinned-locations.service.js.map