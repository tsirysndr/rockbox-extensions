import { MusicProvider } from "@tsirysndr/rockbox-addon-sdk";
import metadata from "./deno.json" with { type: "json" } 
import { realpath } from "node:fs/promises";

export class FilesProvider extends MusicProvider {
  constructor() {
    super({
      name: "Files",
      version: metadata.version,
      license: metadata.license,
      author: "Tsiry Sandratraina",
      description:
        "This extension allows you to explore media files on your local filesystem.",
    });
  }

  initialize() {
    console.log("FilesProvider initialized");
  }

  getMetadata() {
    return this.metadata;
  }

  override async browse(
    path: string = Deno.env.get("ROCKBOX_LIBRARY") || `${Deno.env.get("HOME")}/Music`
  ): Promise<
    Array<{ name: string; type: "file" | "directory"; path: string }>
  > {
    await Deno.stat(path);

    const  files = [];
    for await (const dirEntry of Deno.readDir(path)) {
      files.push({
        name: dirEntry.name,
        type: dirEntry.isFile ? "file" : "directory" as "file" | "directory",
        path: await realpath(`${path}/${dirEntry.name}`),
      });
    }
    return files;
  }

  override download(_filePath: string, _destination: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override play(_filePath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override upload(_filePath: string, _destination: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override shutdown(): void {
    throw new Error("Method not implemented.");
  }
}

const files = new FilesProvider();
Rb.sdk.registerProvider(files);

