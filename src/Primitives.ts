import { Type } from "./Map";

export class Byte extends Type<number> {
  static Size = 1;

  Read() {
    return this.Buffer.readUInt8(0);
  }

  Write(Value) {
    this.Buffer.writeUInt8(Value, 0);
  }
}
export class Short extends Type<number> {
  static Size = 2;

  Read() {
    return this.Buffer.readInt16LE(0);
  }

  Write(Value) {
    this.Buffer.writeInt16LE(Value, 0);
  }
}
export class UShort extends Type<number> {
  static Size = 2;

  Read() {
    return this.Buffer.readUInt16LE(0);
  }

  Write(Value) {
    this.Buffer.writeUInt16LE(Value, 0);
  }
}
export class Int extends Type<number> {
  static Size = 4;

  Read() {
    return this.Buffer.readInt32LE(0);
  }

  Write(Value) {
    this.Buffer.writeInt32LE(Value, 0);
  }
}
export class UInt extends Type<number> {
  static Size = 4;

  Read() {
    return this.Buffer.readUInt32LE(0);
  }

  Write(Value) {
    this.Buffer.writeUInt32LE(Value, 0);
  }
}
export function BString(Size: number) {
  let Bytes = Math.pow(2, Math.ceil(Math.log2(Math.log2(Size))));
  if (Bytes < 8) Bytes = 8;
  const Ix = Bytes / 8;
  const FnName = `UInt${Bytes}${Bytes === 8 ? "" : "LE"}`;
  return class BString extends Type<string> {
    static Size = Size + Ix;

    Read() {
      const Length = this.Buffer[`read${FnName}`](0);
      return this.Buffer.slice(Ix, Ix + Length).toString();
    }

    Write(Value: string) {
      const Length = Math.min(Size, Value.length);
      this.Buffer[`write${FnName}`](Length, 0);
      this.Buffer.write(Value, Ix, Length);
    }
  };
}
