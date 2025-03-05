"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinnedLocationsController = void 0;
const common_1 = require("@nestjs/common");
const pinned_locations_service_1 = require("./pinned-locations.service");
const create_pinned_location_dto_1 = require("./dto/create-pinned-location.dto");
const update_pinned_location_dto_1 = require("./dto/update-pinned-location.dto");
let PinnedLocationsController = class PinnedLocationsController {
    constructor(pinnedLocationsService) {
        this.pinnedLocationsService = pinnedLocationsService;
    }
    create(createPinnedLocationDto) {
        return this.pinnedLocationsService.create(createPinnedLocationDto);
    }
    findAll() {
        return this.pinnedLocationsService.findAll();
    }
    findOne(id) {
        return this.pinnedLocationsService.findOne(+id);
    }
    update(id, updatePinnedLocationDto) {
        return this.pinnedLocationsService.update(+id, updatePinnedLocationDto);
    }
    remove(id) {
        return this.pinnedLocationsService.remove(+id);
    }
};
exports.PinnedLocationsController = PinnedLocationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pinned_location_dto_1.CreatePinnedLocationDto]),
    __metadata("design:returntype", void 0)
], PinnedLocationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PinnedLocationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PinnedLocationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pinned_location_dto_1.UpdatePinnedLocationDto]),
    __metadata("design:returntype", void 0)
], PinnedLocationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PinnedLocationsController.prototype, "remove", null);
exports.PinnedLocationsController = PinnedLocationsController = __decorate([
    (0, common_1.Controller)('pinned-locations'),
    __metadata("design:paramtypes", [pinned_locations_service_1.PinnedLocationsService])
], PinnedLocationsController);
//# sourceMappingURL=pinned-locations.controller.js.map