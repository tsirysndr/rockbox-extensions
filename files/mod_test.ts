import { assert } from "@std/assert";
import { FilesProvider } from "./mod.ts";

Deno.test("browse", async () => {
  const provider = new FilesProvider();
  let files = await provider.browse(".");
  files = files.sort((a, b) => a.name.localeCompare(b.name));

  assert(files.length == 4 || files.length == 5);
  assert(files[0].name === "deno.json" || files[0].name === "coverage");
  assert(files[0].type === "file" || files[0].type === "directory");
  assert(
    files[0].path.endsWith("/files/deno.json") ||
      files[0].path.endsWith("/files/coverage")
  );
});
