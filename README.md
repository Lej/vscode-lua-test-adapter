# LuaUnit Test Adapter for Visual Studio Code

Lua Test Adapter (https://marketplace.visualstudio.com/items?itemName=lej.vscode-lua-test-adapter)
This is a LuaUnit test adapter for Test Explorer UI (https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer)

## Supported

* Detect LuaUnit tests
* Run LuaUnit tests
* Debugging
  * Depends on Lua Debug (https://marketplace.visualstudio.com/items?itemName=actboy168.lua-debug)
  * Lua Debug has a known issue with Lua 5.4 (https://github.com/actboy168/lua-debug/issues/103)

## Not supported

* Automatic reloading of test definitions
* Autorun

## Getting Started

1. Create an empty folder `example`
2. Download LuaUnit (`example/luaunit.lua`)
  * https://raw.githubusercontent.com/bluebird75/luaunit/master/luaunit.lua
3. Create a test file (`example/test.lua`) with the below content

```lua
luaunit  = require('luaunit')

function testPass()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 3})
end

function testFail()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 4})
end

os.exit(luaunit.LuaUnit.run())
```

4. If the Lua executable is not available via `lua` create `.vscode/settings.json`

```json
{
  "luaTestAdapter.luaExe": "C:/Program Files/Lua/lua-5.1.5_Win64_bin/lua5.1.exe",
}
```

5. Run (or debug) the tests via the Test Explorer UI

## Configuration

| Property | Description |
| --- | --- |
| `luaTestAdapter.luaExe` | Path to Lua executable. Defaults to `lua` |
| `luaTestAdapter.testGlob` | Glob used to find test files. Defaults to `**/[tT]est*.{lua}` |
| `luaTestAdapter.testRegex` | Regex used to find tests. Defaults to `/^\s*function\s+(?:[a-zA-Z][a-zA-Z0-9]*:)?(?<test>[a-zA-Z][a-zA-Z0-9]*)\(\)(?:.*)$/` |
| `luaTestAdapter.testEncoding` | Test file encoding. Defaults to `utf8` |
| `luaTestAdapter.decorationRegex` | Regex used to find line number and failure message. Defaults to `/\.lua:(?<line>[1-9][0-9]*):(?<message>.*)stack traceback:/` |
