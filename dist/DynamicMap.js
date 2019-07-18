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
        this._Keys = this._ExtractKeys();
        this._DefineProperties();
    }
    get Size() {
        return Reflect.getMetadataKeys(this).reduce((x, y) => x + Reflect.getMetadata(y, this).Size, 0);
    }
    toJSON() {
        const Obj = Object.create(null);
        this._Keys.forEach(Key => {
            Obj[Key[0]] = this[Key[0]];
        });
        return Obj;
    }
    _DefineProperty(Key, Type, Index) {
        const Ins = new Type(this.Buffer.slice(Index, Index + Type.Size));
        Object.defineProperty(this, Key, {
            get: Ins.Get.bind(Ins),
            set: Ins.Set.bind(Ins)
        });
        return Type.Size;
    }
    _ExtractKeys() {
        return Reflect.getMetadataKeys(this).map(Key => [
            Key,
            Reflect.getMetadata(Key, this)
        ]);
    }
    _DefineProperties() {
        let Index = 0;
        this._Keys.forEach(Key => {
            Index += this._DefineProperty(Key[0], Key[1], Index);
        });
    }
}
exports.DynamicMemoryMap = DynamicMemoryMap;
