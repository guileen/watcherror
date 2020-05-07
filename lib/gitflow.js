const process = require('process')
const git = require('simple-git/promise')(process.cwd())

function fmtStatus(status) {
    function fmtFiles(name) {
        if (status[name].length > 0) {
            for (let f of status[name]) {
                out += `${name}:  ${f}\n`
            }
        }
    }

    var out = `Branch: \x1b[32m[${status.current}]:\x1b[0m\n`
    fmtFiles("not_added")
    fmtFiles("modified")
    fmtFiles("created")
    fmtFiles("deleted")
    fmtFiles("renamed")
    // fmtFiles("files")
    fmtFiles("staged")
    out += "\n"
    return out
}

module.exports = async function() {
    try{
        status = await git.status()
        // {"not_added":[],"conflicted":[],"created":[],"deleted":[],
        // "modified":[],"renamed":[],"files":[],"staged":[],
        // "ahead":0,"behind":0,"current":"master","tracking":"origin/master"}
        var isClean = status.not_added.length == 0 && status.modified.length == 0 && status.conflicted.length == 0 && 
            status.created.length == 0 && status.deleted.length == 0 && status.renamed.length==0 

        var out = fmtStatus(status)
        if(status.current == "master") {
            if(isClean && status.ahead > 0) {
                out += `Git:<${status.current}> ahead remote\n`
                out += "gpp 即可 git pull --no-edit && git push\n"
                return out
            }
            out += "Tip: gcb切换分支。\n分支名以 feature-/fix-/refactor- 开头.\n如：gcb refactor-example\n"
            return out
        }
        if(status.not_added.length > 0) {
            out += "\n\x1b[90mTip:type `git add " + status.not_added[0] + "` or add to .gitignore\x1b[0m\n"
            return out
        } 
        if(status.modified.length > 0) {
            out += `\n\x1b[32m[${status.current}]:\x1b[0m 输入gc message 即可提交\n`
            return out
        }
        out += `\n\x1b[32m[${status.current}]:\x1b[0m TODO .... \n`
        return out
    } catch(e) {
    }
}
