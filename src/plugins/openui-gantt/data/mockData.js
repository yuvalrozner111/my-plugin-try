export const dataSource = [
    {
        type: 'project',
        label: 'פרוייקט 1',
        treeLabel: 'Tree: פרוייקט 1',
        dateStart: '2021-5-2',
        duration: 60 * 24 * 60 * 60 * 1000,
        expanded: true,
        connections: [{
            target: 1,
            type: 0
        }],
        tasks: [{
            type: 'task',
            label: 'משימה 1.1',
            treeLabel: 'Tree: משימהvvv 1.1',
            dateStart: '2021-5-5',
            duration: 10 * 24 * 60 * 60 * 1000,
            connections: [{
                target: 2,
                type: 1
            }]
        },
        {
            type: 'task',
            label: 'משימה 1.2',
            treeLabel: 'Tree: משימה 1.2',
            dateStart: '2021-5-16',
            duration: 12 * 24 * 60 * 60 * 1000,
            connections: [{
                target: 3,
                type: 1
            }]
        },
        {
            type: 'milestone',
            label: 'אבן דרך 1',
            treeLabel: 'Tree: אבן דרך 1',
            dateStart: '2021-6-1',
            connections: [{
                target: 4,
                type: 1
            }]
        },
        {
            type: 'task',
            label: 'משימה 1.3',
            treeLabel: 'Tree: משימה 1.3',
            dateStart: '2021-6-2',
            duration: 90 * 24 * 60 * 60 * 1000 //90 days in miliseconds
        }
        ]
    },
    {
        type: 'project',
        label: 'פרויקט 2',
        treeLabel: 'Tree: פרויקט 2',
        dateStart: '2021-10-1',
        duration: 60 * 24 * 60 * 60 * 1000,
        expanded: true,
        connections: [{
            target: 6,
            type: 0
        }],
        tasks: [{
            type: 'task',
            label: 'משימה 2.1',
            treeLabel: 'Tree: משימה 2.1',
            dateStart: '2021-10-2',
            duration: 15 * 24 * 60 * 60 * 1000,
            connections: [{
                target: 7,
                type: 0
            }]
        },
        {
            type: 'task',
            label: 'משימה 2.2',
            treeLabel: 'Tree: משימה 2.2',
            dateStart: '2021-10-2',
            duration: 10 * 24 * 60 * 60 * 1000,
            connections: [{
                target: 8,
                type: 1
            }]
        },
        {
            type: 'task',
            label: 'משימה 2.3',
            treeLabel: 'Tree: משימה 2.3',
            dateStart: '2021-11-1',
            duration: 45 * 24 * 60 * 60 * 1000 //45 days in miliseconds
        }
        ]
    }
];
