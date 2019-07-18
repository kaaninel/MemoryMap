import "reflect-metadata";

import { DynamicType, DynamicMemoryMap } from "./DynamicMap";

export abstract class Type<T = any> extends DynamicType<T> {
  static Size: number;

  Size() {
    return (this.constructor as typeof Type).Size;
  }
}

type Constructor<T = any> = { new (...args: any[]): T };

export function Field<T>(Type: Constructor<Type<T>>) {
  return function(Target, Key: string) {
    Reflect.defineMetadata(Key, Type, Target);
  };
}

export class MemoryMap extends DynamicMemoryMap {
  static get Size() {
    return Reflect.getMetadataKeys(this.prototype).reduce(
      (x, y) => x + Reflect.getMetadata(y, this.prototype).Size,
      0
    );
  }
}
