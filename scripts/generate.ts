import faker from "faker";

function writeTable<T>(name: string, generator: () => T) {}

function readTable(name: string) {}

function makeUsers() {}

function makeEvents() {
    // event generator
    // const makeEvent = (relationalData: <Event>): Event => ({
    //     active: Math.random() > .5,
    //     created_at: faker.date.recent(5).toISOString(),
        
    // });

    // get all users
    const users = readTable('users');
    
    // for each user, make 5 events
}


//
// ─── THE ORDER OF THE FUNCTIONS BELOW MATTERS ───────────────────────────────────
//
writeTable("user", makeUsers);
writeTable('event', makeEvents);