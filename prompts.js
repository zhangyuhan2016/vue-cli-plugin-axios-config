module.exports = [
    {
        type: 'list',
        name: 'import',
        message: 'How do you want to add test api demo?',
        choices: [
            { name: 'Import', value: 'yes' },
            { name: 'Not Import', value: 'not' }
        ],
        default: 'yes',
    }
]
