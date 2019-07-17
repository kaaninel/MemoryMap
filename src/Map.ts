import "reflect-metadata";
import { Byte } from "./Primitives";
import { DynamicType } from "./DynamicMap";

export abstract class Type<T = any> extends DynamicType<T> {
  static Size: number;

  Size() {
    return (this.constructor as typeof Type).Size;
  }
}

type Constructor<T = any> = { new (...args: any[]): T };

export function Field<T>(Type: Constructor<Type<T>>) {
  return function(Target, Key: string) {
    console.log(Key, Type, Target);
    Reflect.defineMetadata(Key, Type, Target);
  };
}

export class MemoryMap {
  static get Size() {
    return Reflect.getMetadataKeys(this.prototype).reduce(
      (x, y) => x + Reflect.getMetadata(y, this.prototype).Size,
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

  protected _ExtractKeys() {
    this._Keys = Reflect.getMetadataKeys(this).map(Key => [
      Key,
      Reflect.getMetadata(Key, this)
    ]);
  }

  protected _DefineProperties() {
    let Index;
    this._Keys.forEach(Key => {
      Index += this._DefineProperty(Key[0], Key[1], Index);
    });
  }

  constructor(public Buffer: Buffer) {
    this._ExtractKeys();
    this._DefineProperties();
  }
}
