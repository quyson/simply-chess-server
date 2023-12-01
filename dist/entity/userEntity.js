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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
var Rank;
(function (Rank) {
    Rank["Wood"] = "Wood";
    Rank["Iron"] = "Iron";
    Rank["Bronze"] = "Bronze";
    Rank["Silver"] = "Silver";
    Rank["Gold"] = "Gold";
    Rank["Platinum"] = "Platinum";
    Rank["Ruby"] = "Ruby";
    Rank["Sapphire"] = "Sapphire";
    Rank["Emerald"] = "Emerald";
    Rank["Pearl"] = "Pearl";
    Rank["Diamond"] = "Diamond";
})(Rank || (Rank = {}));
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "elo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Rank }),
    __metadata("design:type", String)
], UserEntity.prototype, "rank", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)()
], UserEntity);
