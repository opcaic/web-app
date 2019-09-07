export const addLastExecution = item =>
  Object.assign(item, {
    lastExecution: item.executions[item.executions.length - 1],
  });

export const addLastExecutions = items => items.map(x => addLastExecution(x));
