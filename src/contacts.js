
const readline = require("readline/promises");

// readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let contacts=[]
let id=1;

// emails set
let emails=new Set();
// phones set
let phones=new Set();

// Email regular Exprission for email validation
let emailExp=/^\w+@\w+\.\w{3}$/
// Phone regular Exprission for Egyptian Number validation
let phoneExp=/^\+201[0125]\d{8}$/

// Add Contact
async function addContact(){
    let contact={};
    contact.id=id;
    
    console.log("Enter new Contact");
    
    const name=await rl.question('Enter name :');
    const email=(await rl.question('Enter email :'));
    const phone=(await rl.question('Enter phone :'));
    // Email validation
    if(!emailExp.test(email)){
        console.log("invalid email");
        return;
    }
    // phone validation
    if(!phoneExp.test(phone)){
        console.log("invalid phone");
        return;
    }
    if(emails.has(email) || phones.has(phone)){
        console.log("The email or phone already exists"); 
    }else{

        contact.name=name;
        contact.email=email;
        emails.add(contact.email);
        contact.phone=phone;
        phones.add(contact.phone);
        contacts.push(contact);
        id++;
    }

    console.log(contacts);
}


// Remove Contact
async function removeContact(){
    const id = await rl.question('Enter the id of Contact: ');    
    contacts =contacts.filter((c)=>{if(c.id==id){
        emails.delete(c.email);
        phones.delete(c.phone);
    }return c.id!=id});

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
    // Email validation
    if(!emailExp.test(newEmail)){
        console.log("invalid email");
        return;
    }
    // phone validation
    if(!phoneExp.test(newPhone)){
        console.log("invalid phone");
        return;
    }

if (newEmail !== contact.email && emails.has(newEmail)) {
    console.log("The email already exists");
    return;
}

if (newPhone !== contact.phone && phones.has(newPhone)) {
    console.log("The phone already exists");
    return;
}

if (newEmail !== contact.email) {
    emails.delete(contact.email);
    emails.add(newEmail);
    contact.email = newEmail;
}

if (newPhone !== contact.phone) {
    phones.delete(contact.phone);
    phones.add(newPhone);
    contact.phone = newPhone;
}

contact.name = newName;

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
    let contact =cachedSearch(id);
    if(!contact){
        console.log("not found");
        return;
        
    }
    console.log(`contact: `,contact);
    
    
    
}

// Search Contact in cache

function searchContactCache(){
    const cache = new Map();
    return function(id){
        if(cache.has(id)){
            console.log("Found in cache");
            const contact =cache.get(id);
            cache.delete(id);
            cache.set(id,contact);
            return contact;
        }

        const contact =contacts.find((c)=>c.id==id);
        // Keep the 3 most recently searched contacts in the cache
        if(contact){
            if(cache.size<3){
                cache.set(id,contact);
            }else{
                const firstId = cache.keys().next().value;
                cache.delete(firstId);
                cache.set(id,contact);
            }
        }else{
            console.log("Not Found");
            
        }
        console.log("cache :",cache);
        
        return contact;
    }
}

const cachedSearch=searchContactCache();

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