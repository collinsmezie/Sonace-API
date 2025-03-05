"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePinnedLocationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pinned_location_dto_1 = require("./create-pinned-location.dto");
class UpdatePinnedLocationDto extends (0, mapped_types_1.PartialType)(create_pinned_location_dto_1.CreatePinnedLocationDto) {
}
exports.UpdatePinnedLocationDto = UpdatePinnedLocationDto;
//# sourceMappingURL=update-pinned-location.dto.js.map