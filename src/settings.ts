import * as vscode from "vscode";

export function getLuaExe(): string {
  return getOrDefault("luaExe", "lua");
}

export function getTestGlob(): string {
  return getOrDefault("testGlob", "**/[tT]est*.{lua}");
}

export function getTestRegex(): RegExp {
  const text = getOrDefault("testRegex", "");
  if (text !== "") return new RegExp(text, "gm");
  return /^\s*function\s+(?:[a-zA-Z][a-zA-Z0-9]*:)?(?<test>[a-zA-Z][a-zA-Z0-9]*)\(\)(?:.*)$/gm;
}

export function getTestEncoding(): string {
  return getOrDefault("testEncoding", "utf8");
}

export function getDecorationRegex(): RegExp {
  const text = getOrDefault("decorationRegex", "");
  if (text !== "") return new RegExp(text, "gs");
  return /\.lua:(?<line>[1-9][0-9]*):(?<message>.*)stack traceback:/gs;
}

function getOrDefault(section: string, fallback: string) {
  const config = vscode.workspace.getConfiguration("luaTestAdapter");
  const value = config.get<string>(section);
  if (!value || value === "") return fallback;
  return value;
}
