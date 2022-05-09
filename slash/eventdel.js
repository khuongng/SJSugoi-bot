//wip
const run = async (client, interaction) => {

}

module.exports = {
    name: "delete event",
    description: "Deletes a previously created event",
    options: [
        {
            name: "name",
            description: "The name of the event text to delete",
            type: "STRING",
            required: true
        }
    ],
    run
}