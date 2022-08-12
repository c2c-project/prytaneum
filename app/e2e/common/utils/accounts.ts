/**
 * Number of accounts based on the number of devices.
 * The number of devices is used to determine the playwright.config.ts under "projects".
 * Ensures that in a test.beforeAll/test.beforeEach can use fixtures while keeping tests isolated
 */
export function getUsersByDeviceAmmount(deviceAmmount: number) {
    const users = [];
    for (let i = 0; i < deviceAmmount; i++) {
        users.push(`user${i + 1}`);
    }
    return users;
}

export function getOrganizersByDeviceAmmount(deviceAmmount: number) {
    const organizers = [];
    for (let i = 0; i < deviceAmmount; i++) {
        organizers.push(`organizer${i + 1}`);
    }
    return organizers;
}
