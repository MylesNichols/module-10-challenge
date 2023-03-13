const inquirer = require('inquirer');
const PORT = 3001;

// Sets classes for the different employees
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.position = 'Employee';
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.position;
    }
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber
        this.position = 'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.position = 'Engineer';
    }

    getGithub() {
        return this.github;
    }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.position = 'Intern';
    }

    getSchool() {
        return this.school;
    }
}

// Array to store Employee Information
const employees = [];


async function promptManager() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the manager's name?"
            },
    
            {
                type: 'input',
                name: 'id',
                message: "what is the manager's ID number?"
            },
    
            {
                type: 'input',
                name: 'email',
                message: "What is the manager's email address?"
            },
    
            {
                type: 'input',
                name: 'office',
                message: "What is the manager's office number?"
            },
        ]);
    
        const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
        employees.push(manager);
        console.log('Manager was added!');
        return manager;
    } catch (error) {
        console.log(error);
    }
};

async function promptMenu() {
    try {
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'menu',
          message: 'What is next to do?',
          choices: ['Add an Engineer', 'Add an Intern', 'My team is finished!']
        }
      ]);
  
      if (answer.menu === 'Add an Engineer') {
        await promptEngineer();
      } else if (answer.menu === 'Add an Intern') {
        await promptIntern();
      } else {
        await generateHTML();
      }
    } catch (error) {
      console.log(error);
    }
  }

function promptEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?"
        },

        {
            type: 'input',
            name: 'id',
            message: "what is the engineer's ID number?"
        },

        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?"
        },

        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's github username?"
        },
    ]).then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);
        console.log('Engineer was added!');
        promptMenu();
    }).catch((error) => {
        console.log(error);
    });
};

function promptIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?"
        },

        {
            type: 'input',
            name: 'id',
            message: "what is the intern's ID number?"
        },

        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?"
        },

        {
            type: 'input',
            name: 'School',
            message: "What is the intern's school?"
        },
    ]).then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);
        console.log('Intern was added!');
        promptMenu();
    }).catch((error) => {
        console.log(error);
    });
};

function render(team) {
    const manager = team.getManager();
    const engineer = team.getEngineer();
    const intern = team.getIntern();

    // Add HTML to the Manager Card
    const managerCard = `
    <div class="card">
        <div class="card-header"></div>
            <h2>${manager.getName()}</h2>
            <h3>${manager.getPosition()}</h3>
        </div>
        <div class ="card-body"></div>
            <ul>
                <li>ID: ${manager.getId()}</li>
                <li>Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                <li>Office Number: ${manager.getOfficeNumber()}</li>
            </ul>
        </div>
    </div>
`;
// Creates Engineer Card
    const engineerCard = engineer.map(engineer => {
        return `
        <div class="card">
            <div class="card-header">
                <h2>${engineer.getName()}</h2>
                <h3>${engineer.getPosition()}</h3>
            </div>
            <div class="card-body">
            <ul>
                <li>ID: ${engineer.getId()}</li>
                <li>Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                <li>Github: <a href="https://github.com/${engineer.getGithub()}">${engineer.getGithub()}</a></li>
            </ul>
        </div>
    </div>
    `;
}).join('');

// Creates Intern Card
    const InternCard = intern.map(intern => {
        return `
        <div class="card">
            <div class="card-header">
                <h2>${intern.getName()}</h2>
                <h3>${intern.getPosition()}</h3>
            </div>
            <div class="card-body">
            <ul>
                <li>ID: ${intern.getId()}</li>
                <li>Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                <li>School: ${intern.school()}</li>
            </ul>
        </div>
    </div>
    `;
}).join('');
}

module.exports = {
    Employee,
    promptManager,
    employees,
    promptEngineer,
    promptIntern,
    promptMenu

};