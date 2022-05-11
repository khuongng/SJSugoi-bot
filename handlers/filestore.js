// Read file on start:
const fs = require('fs');

const dataFilePath = './events.json';
let eventData = {}
if(fs.existsSync(dataFilePath)) { // creates the events.json file if it doesn't exist already
    const fileText = fs.readFileSync(dataFilePath).toString();
    eventData = JSON.parse(fileText);
}
// eventData is an object, store stuff there

const createevent = (name, text) => {
    eventData[name] = text;
    fs.writeFileSync(dataFilePath, JSON.stringify(eventData));
    console.log("Creating event with name \"" + name + "\".");
}

const delevent = (name) => {
    delete eventData[name]; 
    fs.writeFileSync(dataFilePath, JSON.stringify(eventData));
    console.log("Deleting event with name \"" + name + "\".");
}

const getevent = (name) => {
    return eventData[name];
}

module.exports = {
    createevent,
    delevent,
    getevent
}