luaunit  = require('./libs/luaunit')

function testSuccess1()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 3})
end

function testFailure1()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 4})
end

function testSuccess2()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 3})
end

function testFailure2()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 4})
end

os.exit(luaunit.LuaUnit.run())