const inquirer = require('inquirer');
const { promptManager, Employee, employees} = require('../assets/script.js');

jest.mock('inquirer');

describe('promptManager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    
    });

    it('should add a manager', async () => {
        inquirer.prompt.mockResolvedValueOnce({
            name: 'Myles Nichols',
            id: '21',
            email: 'happyhorse@gmail.com',
            office: '537'
        });
        
        await promptManager();

        expect(employees.length).toBe(1);
        expect(employees[0]).toBeInstanceOf(Object);
        expect(employees[0].name).toBe('Myles Nichols');
        expect(employees[0].id).toBe('21');
        expect(employees[0].email).toBe('happyhorse@gmail.com');
        expect(employees[0].officeNumber).toBe('537');
        expect(employees[0].getRole()).toBe('Manager');
        });
    });