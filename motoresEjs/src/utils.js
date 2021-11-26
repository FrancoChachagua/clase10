import fs from 'fs'

function makeId(data){
    let initialId = 1;

    for (var i = 0; i <= data.length; i++) {
        initialId = data.length + 1;
        }
    return initialId;
}

export default makeId;