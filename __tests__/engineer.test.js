const inquirer = require('inquirer');
const { promptEngineer, Employee, employees} = require('../assets/script.js');

jest.mock('inquirer');

describe('promptEngineer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    
    });

    it('should add an Engineer', async () => {
        inquirer.prompt.mockResolvedValueOnce({
            name: 'Myles Nichols',
            id: '22',
            email: 'happyhorse@gmail.com',
            github: 'MylesNichols'
        });
        
        await promptEngineer();

        expect(employees.length).toBe(1);
        expect(employees[0]).toBeInstanceOf(Object);
        expect(employees[0].name).toBe('Myles Nichols');
        expect(employees[0].id).toBe('22');
        expect(employees[0].email).toBe('happyhorse@gmail.com');
        expect(employees[0].github).toBe('MylesNichols');
        expect(employees[0].getRole()).toBe('Engineer');
        });
    });