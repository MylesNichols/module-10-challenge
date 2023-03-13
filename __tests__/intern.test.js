const inquirer = require('inquirer');
const { promptIntern, Employee, employees} = require('../assets/script.js');

jest.mock('inquirer');

describe('promptIntern', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    
    });

    it('should add an intern', async () => {
        inquirer.prompt.mockResolvedValueOnce({
            name: 'Myles Nichols',
            id: '22',
            email: 'happyhorse@gmail.com',
            school: 'UCF'
        });
        
        await promptIntern();

        expect(employees.length).toBe(1);
        expect(employees[0]).toBeInstanceOf(Object);
        expect(employees[0].name).toBe('Myles Nichols');
        expect(employees[0].id).toBe('22');
        expect(employees[0].email).toBe('happyhorse@gmail.com');
        expect(employees[0].school).toBe('UCF');
        expect(employees[0].getRole()).toBe('Intern');
        });
    });