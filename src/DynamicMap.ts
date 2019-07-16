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
  toJSON() {
    const Obj = Object.create(null);
    this._Keys.forEach(Key => {
      Obj[Key] = this[Key];
    });
    return Obj;
  }

  private _Keys: string[];

  static $() {}

  constructor(public Buffer: Buffer) {
    let Index = 0;
    this._Keys = Reflect.getMetadataKeys(this);
    this._Keys.forEach(Key => {
      const C = Reflect.getMetadata(Key, this) as typeof Byte;
      const I = Index;
      Index += C.Size;
      const Ins = new C(this.Buffer.slice(I, I + C.Size));
      Object.defineProperty(this, Key, {
        get: Ins.Get.bind(Ins),
        set: Ins.Set.bind(Ins)
      });
    });
  }
}
