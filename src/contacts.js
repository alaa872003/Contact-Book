
const readline = require("readline/promises");

// readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const contacts=[]
let id=1;

// Add Contact
async function addContact(){
    console.log(`in add function`);
    let contact={};
    contact.id=id;
    id++;
    console.log("Enter new Contact");
    
    const name=await rl.question('Enter name :');
    const email=await rl.question('Enter email :');
    const phone=await rl.question('Enter phone :');
    contact.name=name;
    contact.email=email;
    contact.phone=phone;

    contacts.push(contact);
    console.log(contacts);
}


// Remove Contact
function removeContact(){
    console.log(`in remove function`);

}

// Update Contact
function updateContact(){
    console.log(`in update function`);

}

// List Contacts
function listContacts(){
    console.log(`in list function`);

}

// Search Contact
function searchContact(){
    console.log(`in search function`);


}

async function crud(num){
    switch(num){
        case 1:
            await addContact();
            break;
        case 2:
            removeContact();
            break;
        case 3:
            updateContact();
            break;
        case 4:
            listContacts();
            break;
        case 5:
            searchContact();
            break;
        default:
            break;

    }
}



async function run() {
    let choice;

    do {
        console.log(`
        What do you want to do?
        1. Add contact
        2. Remove contact
        3. Update contact
        4. List contacts
        5. Search contact
    `);

    let answer = await rl.question("Choose an operation: ");
    let num = Number(answer);

    await crud(num);

    choice = await rl.question(
        "Do you want to do another operation? (yes/no): "
    );

    } while (choice.toLowerCase() === "yes");

    rl.close();
}

run()