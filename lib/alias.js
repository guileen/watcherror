module.exports = function(line) {
    line = line.trimLeft()
    var cmd = line.split(" ", 1)[0]
    var newCmd = aliases[cmd]
    if (newCmd != null) {
        if(cmd=="gc") {
            return newCmd + '"' + line.substring(cmd.length) + '"'
        }
        return newCmd + line.substring(cmd.length)
    }
}

var aliases = {
    "gc" : "git commit -a -m",
    "gpp" : "git pull --no-edit && git push",
}