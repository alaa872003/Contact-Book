
const readline = require("readline/promises");

// readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let contacts=[]
let id=1;

// Add Contact
async function addContact(){
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
async function removeContact(){
    const id = await rl.question('Enter the id of Contact: ');
    contacts =contacts.filter((c)=>c.id!=id);
    console.log(`Contacts after delete: `,contacts);

    
}

// Update Contact
async function updateContact(){
    const id= await rl.question('Enter the id of Contact:');
    let contact=contacts.find((c)=>c.id==id);
    if(!contact){
        console.log( "there isn't contact with this id..");
        return;
    }
    let newName=await rl.question('Enter new name:') || contact.name;
    let newEmail=await rl.question('Enter new email:') ||contact.email;
    let newPhone=await rl.question('Enter new phone:') ||contact.phone;
    contact.name=newName;
    contact.email=newEmail;
    contact.phone=newPhone;
    console.log(contacts);
    
}

// List Contacts
function listContacts(){
    contacts.forEach(c => {
        console.log(`contact ${c.id}:( ${c.name} , ${c.email} , ${c.phone})`);        
    });
}

// Search Contact
async function searchContact(){
    const id = await rl.question('Enter the id of Contact: ');
    let contact =contacts.find((c)=>c.id==id);
    if(!contact){
        console.log("not found");
        return;
        
    }
    console.log(`contact: `,contact);



}

async function crud(num){
    switch(num){
        case 1:
            await addContact();
            break;
        case 2:
            await removeContact();
            break;
        case 3:
            await updateContact();
            break;
        case 4:
            listContacts();
            break;
        case 5:
            await searchContact();
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