const fs = require("fs/promises");

const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");


const contactsOperation = require("./contacts")

const invokeAction = async({ action, id, name, email, phone }) => {
    switch(action){
        case 'list':
            const contactsList = await contactsOperation.listContacts();
            console.log(contactsList);
            break;
        case 'get':
            const contactById = await contactsOperation.getContactById(id);
            console.log(contactById);
            break;
        case 'remove':
            const removeById = await contactsOperation.removeContact(id)
            console.log(removeById);
            break;
        case 'add':
            const newContact = await contactsOperation.addContact(name, email, phone)
            console.log(newContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
        }
}


const arr = hideBin(process.argv);

const {argv} = yargs(arr);

invokeAction(argv);


