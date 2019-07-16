"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = require("./Map");
class Byte extends Map_1.Type {
    Read() {
        return this.Buffer.readUInt8(0);
    }
    Write(Value) {
        this.Buffer.writeUInt8(Value, 0);
    }
}
Byte.Size = 1;
exports.Byte = Byte;
class Short extends Map_1.Type {
    Read() {
        return this.Buffer.readInt16LE(0);
    }
    Write(Value) {
        this.Buffer.writeInt16LE(Value, 0);
    }
}
Short.Size = 2;
exports.Short = Short;
class UShort extends Map_1.Type {
    Read() {
        return this.Buffer.readUInt16LE(0);
    }
    Write(Value) {
        this.Buffer.writeUInt16LE(Value, 0);
    }
}
UShort.Size = 2;
exports.UShort = UShort;
class Int extends Map_1.Type {
    Read() {
        return this.Buffer.readInt32LE(0);
    }
    Write(Value) {
        this.Buffer.writeInt32LE(Value, 0);
    }
}
Int.Size = 4;
exports.Int = Int;
class UInt extends Map_1.Type {
    Read() {
        return this.Buffer.readUInt32LE(0);
    }
    Write(Value) {
        this.Buffer.writeUInt32LE(Value, 0);
    }
}
UInt.Size = 4;
exports.UInt = UInt;
function BString(Size) {
    var _a;
    let Bytes = Math.pow(2, Math.ceil(Math.log2(Math.log2(Size))));
    if (Bytes < 8)
        Bytes = 8;
    const Ix = Bytes / 8;
    const FnName = `UInt${Bytes}${Bytes === 8 ? "" : "LE"}`;
    return _a = class BString extends Map_1.Type {
            Read() {
                const Length = this.Buffer[`read${FnName}`](0);
                return this.Buffer.slice(Ix, Ix + Length).toString();
            }
            Write(Value) {
                const Length = Math.min(Size, Value.length);
                this.Buffer[`write${FnName}`](Length, 0);
                this.Buffer.write(Value, Ix, Length);
            }
        },
        _a.Size = Size + Ix,
        _a;
}
exports.BString = BString;
