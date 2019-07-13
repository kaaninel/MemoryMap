# MemoryMap

A class wrapper for mapping class properties into a buffer.

```ts
class Map extends MemoryMap {
  @Field(Byte) // 1
  Id: number;

  @Field(UInt) // 4
  Id2: number;

  @Field(BString(15)) // 16
  Name: string;
}

const Buff = Buffer.alloc(Map.Size); // 21

const a = new Map(Buff);

console.log(Buff);
a.Id = 12;
console.log(Buff);
a.Name = "Test Acc";
console.log(Buff);
```
