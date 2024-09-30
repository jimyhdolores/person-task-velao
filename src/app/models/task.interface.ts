export interface IAdminTask {
  complete: boolean;
  task: ITask;
}

export interface ITask {
  task: string;
  deadline: string;
  persons: AssociatedPerson[];
}

export interface AssociatedPerson {
  fullName: string;
  age: number;
  skills: string[];
}
