import { createContext } from 'react';

const TaskSwitchContext = createContext({
    taskSwitches: {},
    setTaskSwitches: () => {}
});


export default TaskSwitchContext;
