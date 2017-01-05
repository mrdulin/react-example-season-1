const {normalize, schema} = require('normalizr');
const fs = require('fs');

const myData = {
    users: [
        {id: 1},
        {id: 2}
    ]
}

const user = new schema.Entity('users');
const mySchema = {users: [user]};
const normalizedData = normalize(myData, mySchema);

fs.writeFileSync('./output.json', JSON.stringify(normalizedData, null, 4))