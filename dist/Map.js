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
        console.log(Key, Type, Target);
        Reflect.defineMetadata(Key, Type, Target);
    };
}
exports.Field = Field;
class MemoryMap {
    constructor(Buffer) {
        this.Buffer = Buffer;
        let Index = 0;
        this._Keys = Reflect.getMetadataKeys(this);
        this._Keys.forEach(Key => {
            const C = Reflect.getMetadata(Key, this);
            const I = Index;
            Index += C.Size;
            const Ins = new C(this.Buffer.slice(I, I + C.Size));
            Object.defineProperty(this, Key, {
                get: Ins.Get.bind(Ins),
                set: Ins.Set.bind(Ins)
            });
        });
    }
    static get Size() {
        return Reflect.getMetadataKeys(this.prototype).reduce((x, y) => x + Reflect.getMetadata(y, this.prototype).Size, 0);
    }
    toJSON() {
        const Obj = Object.create(null);
        this._Keys.forEach(Key => {
            Obj[Key] = this[Key];
        });
        return Obj;
    }
}
exports.MemoryMap = MemoryMap;
