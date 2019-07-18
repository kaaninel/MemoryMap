"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DynamicMap_1 = require("./DynamicMap");
class Type extends DynamicMap_1.DynamicType {
    Size() {
        return this.constructor.Size;
    }
}
exports.Type = Type;
function Field(Type) {
    return function (Target, Key) {
        Reflect.defineMetadata(Key, Type, Target);
    };
}
exports.Field = Field;
class MemoryMap extends DynamicMap_1.DynamicMemoryMap {
    static get Size() {
        return Reflect.getMetadataKeys(this.prototype).reduce((x, y) => x + Reflect.getMetadata(y, this.prototype).Size, 0);
    }
}
exports.MemoryMap = MemoryMap;
