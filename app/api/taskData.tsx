export interface TasksData {
  id: number;
  title: string;
  description: string;
  taskCreated: string;
}

export const tasksData = [
  {
    id: 1,
    title: 'Task Title 1',
    description: 'Homeworks needed to be checked are as follows : Client Profile Questionnaire, Passport Requirements and Images, Personal Documents.',
    taskCreated: '18/12/2023',
  },
  {
    id: 2,
    title: 'Task Title 2',
    description: 'Task Description 2',
    taskCreated: '25/12/2023',
  },
  {
    id: 3,
    title: 'Task Title 3',
    description: 'Task Description 3',
    taskCreated: '29/12/2023',
  },
];

export default tasksData;