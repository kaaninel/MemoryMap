"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class DynamicType {
    constructor(Buffer) {
        this.Buffer = Buffer;
    }
    Get() {
        if (!this._Content)
            this._Content = this.Read();
        return this._Content;
    }
    Set(Value) {
        this.Write(Value);
        this._Content = Value;
    }
}
exports.DynamicType = DynamicType;
class DynamicMemoryMap {
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
    toJSON() {
        const Obj = Object.create(null);
        this._Keys.forEach(Key => {
            Obj[Key] = this[Key];
        });
        return Obj;
    }
    static $() { }
}
exports.DynamicMemoryMap = DynamicMemoryMap;
