const fs = require("fs/promises");
const { nanoid } =  require ("nanoid")
const path = require("path");

const contactsPath = path.join(__dirname, "\db", "contacts.json") ;

const listContacts = async() => {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    return contactsList
}
  
 const getContactById = async(id) => {
      const contactsList = await listContacts();
      const result = contactsList.find(item => item.id === String(id))
      if(!result) {
          return null;
      }
      return result
  }
  
  const removeContact = async(id) => {
    const contactsList = await listContacts();
    const idx = contactsList.findIndex(item => item.id === String(id))
    if(idx === -1) {
        return null
    }
    const newContactsList = contactsList.filter((_, index) => index !== idx)
    updateContactsList(newContactsList)
    return contactsList[idx];
  }
  
  const addContact = async(name, email, phone) => {
    const contactsList = await listContacts();
    const newItem = {
        id: String(nanoid()),
        name: `${name}`,
        email: `${email}`,
        phone: `${phone}`
    }
    contactsList.push(newItem);
    updateContactsList(contactsList)
    return newItem 
  }


  const updateContactsList = async(contactsList)=> {
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
}


  const contactsOperation = {
      listContacts,
      getContactById,
      removeContact,
      addContact
  }


  module.exports = contactsOperation;