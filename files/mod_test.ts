import { assertEquals, assert } from "@std/assert";
import { FilesProvider } from "./mod.ts";

Deno.test("browse", async () => {
  const provider = new FilesProvider();
  const files = await provider.browse(".");
  assertEquals(files.length, 4);
  assertEquals(files[0].name, "mod.ts");
  assertEquals(files[0].type, "file");
  assert(files[0].path.endsWith("/files/mod.ts"));
  assertEquals(files[1].name, "deno.json");
  assertEquals(files[1].type, "file");
  assert(files[1].path.endsWith("/files/deno.json"));
  assertEquals(files[2].name, "deno.lock");
  assertEquals(files[2].type, "file");
  assert(files[2].path.endsWith("/files/deno.lock"));
  assertEquals(files[3].name, "mod_test.ts");
  assertEquals(files[3].type, "file");
  assert(files[3].path.endsWith("/files/mod_test.ts"));
});
