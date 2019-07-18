import "reflect-metadata";
import { Byte } from "./Primitives";

export abstract class DynamicType<T = any> {
  abstract Read(): T;
  abstract Write(Value: T): void;
  abstract Size(Value: T): number;

  constructor(public Buffer: Buffer) {}

  _Content?: T;

  Get() {
    if (!this._Content) this._Content = this.Read();
    return this._Content;
  }

  Set(Value) {
    this.Write(Value);
    this._Content = Value;
  }
}

export class DynamicMemoryMap {
  get Size() {
    return Reflect.getMetadataKeys(this).reduce(
      (x, y) => x + Reflect.getMetadata(y, this).Size,
      0
    );
  }

  toJSON() {
    const Obj = Object.create(null);
    this._Keys.forEach(Key => {
      Obj[Key[0]] = this[Key[0]];
    });
    return Obj;
  }

  private _Keys: [string, typeof Byte][];

  protected _DefineProperty(Key: string, Type: typeof Byte, Index: number) {
    const Ins = new Type(this.Buffer.slice(Index, Index + Type.Size));
    Object.defineProperty(this, Key, {
      get: Ins.Get.bind(Ins),
      set: Ins.Set.bind(Ins)
    });
    return Type.Size;
  }

  protected _ExtractKeys(): [string, typeof Byte][] {
    return Reflect.getMetadataKeys(this).map(Key => [
      Key,
      Reflect.getMetadata(Key, this)
    ]);
  }

  protected _DefineProperties() {
    let Index = 0;
    this._Keys.forEach(Key => {
      Index += this._DefineProperty(Key[0], Key[1], Index);
    });
  }

  constructor(public Buffer: Buffer) {
    this._Keys = this._ExtractKeys();
    this._DefineProperties();
  }
}
