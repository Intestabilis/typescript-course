namespace App {
  type Listener<T> = (items: T[]) => void;

  abstract class State<T> {
    // for subscription pattern
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFunction: Listener<T>) {
      this.listeners.push(listenerFunction);
    }
  }

  // State management (singleton pattern)
  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    // for subscription pattern

    private updateListeners(relevantData: Project[]) {
      for (const listener of this.listeners) {
        listener(relevantData);
      }
    }

    private constructor() {
      super();
    }

    public static getInstance() {
      if (this.instance) return this.instance;
      this.instance = new ProjectState();
      return this.instance;
    }

    public addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.Active,
      );
      // const newProject = {
      //   // just for study project will do
      //   id: Math.random().toString(),
      //   title,
      //   description,
      //   people,
      // };
      this.projects.push(newProject);
      // for (const listener of this.listeners) {
      //   listener(this.projects.slice());
      // }
      this.updateListeners(this.projects.slice());
    }

    public moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((project) => project.id === projectId);
      if (project && project.status !== newStatus) project.status = newStatus;
      this.updateListeners(this.projects.slice());
    }
  }

  // singleton instance
  export const projectState = ProjectState.getInstance();
}
