import "reflect-metadata";
import { Byte } from "./Primitives";

export abstract class Type<T = any> {
  abstract Read(): T;
  abstract Write(Value: T): void;
  static Size: number;

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

type Constructor<T = any> = { new (...args: any[]): T };

export function Field<T>(Type: Constructor<Type<T>>) {
  return function(Target, Key: string) {
    console.log(Key, Type, Target);
    Reflect.defineMetadata(Key, Type, Target);
  };
}

export default class MemoryMap {
  static get Size() {
    return Reflect.getMetadataKeys(this.prototype).reduce(
      (x, y) => x + Reflect.getMetadata(y, this.prototype).Size,
      0
    );
  }

  toJSON() {
    const Obj = Object.create(null);
    this._Keys.forEach(Key => {
      Obj[Key] = this[Key];
    });
    return Obj;
  }

  private _Keys: string[];

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
