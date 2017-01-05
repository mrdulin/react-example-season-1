const {normalize, schema} = require('normalizr');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../v2ex-hot.json'), 'utf8'));

const memberSchema = new schema.Entity('member');
const nodeSchema = new schema.Entity('node');
const topicSchema = new schema.Entity('topics', {member: memberSchema, node: nodeSchema}, {
    idAttribute: 'id',
    mergeStrategy: (a, b, c) => {
        return Object.assign({}, a, b, c)
    },
    processStrategy: (value, parent, key) => {
        //复制一份数据
        fs.writeFileSync(path.join(__dirname, './value.json'), JSON.stringify(value, null, 4));
        fs.writeFileSync(path.join(__dirname, './parent.json'), JSON.stringify(parent, null, 4));
        const copy = Object.assign({}, value);
        const fieldsTobeDelete = ['last_touched', 'last_modified', 'replies'];
        fieldsTobeDelete.forEach(field => delete copy[field]);
        return copy;
    }
});
const topicListSchema = new schema.Array(topicSchema);

const output = normalize(data, topicListSchema);

fs.writeFileSync(path.join(__dirname, './output.json'), JSON.stringify(output, null, 4));
fs.writeFileSync(path.join(__dirname, './source.json'), JSON.stringify(data, null, 4));