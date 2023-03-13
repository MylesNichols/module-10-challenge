const inquirer = require('inquirer');
const { afterEach } = require('node:test');
const { promptMenu, Employee, employees, promptEngineer, promptIntern} = require('../assets/script.js');
const menu = {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['Add a Manager', 'Add an Engineer', 'Add an Intern', 'Generate HTML']
};

jest.mock('inquirer');

describe('promptMenu function', () => {
        const inquirerPrompt = jest.spyOn(inquirer, 'prompt');

        afterEach(() => {
            inquirerPrompt.mockClear();
        });

        it('should call prompt with the correct questions', async () => {

            inquirerPrompt.mockImplementation(() => Promise.resolve({ menu: 'Add an Engineer' }));
            
            await promptMenu();
            
            
            expect(inquirerPrompt).toHaveBeenCalledWith([
                {
                    type: 'list',
                    name: 'menu',
                    message: 'what is next to do?',
                    choices: ['Add an Engineer', 'Add an Intern', 'My team is finished!']
                }
            ])
        }
    )}
);
