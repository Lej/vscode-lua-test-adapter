luaunit  = require('../libs/luaunit')

function testPassed1()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 3})
end

function testFailed1()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 4})
end

function testPassed2()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 3})
end

function testFailed2()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 4})
end

os.exit(luaunit.LuaUnit.run())