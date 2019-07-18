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
const Map_1 = require("./Map");
const Primitives_1 = require("./Primitives");
class Map extends Map_1.MemoryMap {
}
__decorate([
    Map_1.Field(Primitives_1.Byte),
    __metadata("design:type", Number)
], Map.prototype, "Id", void 0);
__decorate([
    Map_1.Field(Primitives_1.UInt),
    __metadata("design:type", Number)
], Map.prototype, "Id2", void 0);
__decorate([
    Map_1.Field(Primitives_1.BString(15)),
    __metadata("design:type", String)
], Map.prototype, "Name", void 0);
const Buff = Buffer.alloc(Map.Size);
const a = new Map(Buff);
console.log(Buff);
a.Id = 12;
console.log(Buff);
a.Name = "Test Acc";
console.log(Buff);
