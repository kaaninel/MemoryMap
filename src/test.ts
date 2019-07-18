import { MemoryMap, Field } from "./Map";
import { Byte, UInt, BString } from "./Primitives";

class Map extends MemoryMap {
  @Field(Byte)
  Id: number;
  @Field(UInt)
  Id2: number;
  @Field(BString(15))
  Name: string;
}

const Buff = Buffer.alloc(Map.Size);

const a = new Map(Buff);

console.log(Buff);
a.Id = 12;
console.log(Buff);
a.Name = "Test Acc";
console.log(Buff);
