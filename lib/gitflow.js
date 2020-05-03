const process = require('process')
const git = require('simple-git/promise')(process.cwd())

module.exports = async function(out) {
    try{
        status = await git.status()
        // {"not_added":[],"conflicted":[],"created":[],"deleted":[],
        // "modified":[],"renamed":[],"files":[],"staged":[],
        // "ahead":0,"behind":0,"current":"master","tracking":"origin/master"}
        var flags = []
        if(status.modified.length > 0) {
            for(let f of status.modified) {
                out.write('modified:  ' + f + '\n')
            }
            flags.push('modified')
        }
        if(status.not_added.length > 0) {
            for(let f of status.not_added) {
                out.write('untracked: ' + f + '\n')
            }
            flags.push('untracked')
        } 
        return flags.length > 0
    } catch(e) {
    }
}
