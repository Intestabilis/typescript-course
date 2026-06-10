// enum for status
enum ProjectStatus {
  Active,
  Finished,
}

// Drag and drop interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

//Project Type (honestly not sure why instructor used a class and not an interface for this)
// ok he said that he want to be able to instantiate it but still ehh idk
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus,
  ) {}
}

// Listener type for listener functions
// really just a function that works with projects in this case
type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  // for subscription pattern
  protected listeners: Listener<T>[] = [];

  public addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction);
  }
}

// State management (singleton pattern)
class ProjectState extends State<Project> {
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
const projectState = ProjectState.getInstance();

// validation logic

// validatable object
interface Validatable {
  value: string | number;
  // nullable (can just add | undefined)
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  // for numbers
  min?: number;
  max?: number;
}

function validate(input: Validatable) {
  let isValid = true;
  // required check
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  // min max length
  if (
    input.minLength != null &&
    input.minLength &&
    typeof input.value === "string"
  ) {
    isValid = isValid && input.value.trim().length >= input.minLength;
  }
  if (
    input.maxLength != null &&
    input.maxLength &&
    typeof input.value === "string"
  ) {
    isValid = isValid && input.value.trim().length <= input.maxLength;
  }
  // min max for numbers
  if (input.min != null && typeof input.value === "number") {
    isValid = isValid && input.value >= input.min;
  }
  if (input.max != null && typeof input.value === "number") {
    isValid = isValid && input.value <= input.max;
  }

  return isValid;
}

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjDescriptor;
}

// Base class
// Ohh so know in the middle of a section he actually do refactoring in a more correct class usage
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)!
    );
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId;
    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? `afterbegin` : `beforeend`,
      this.element,
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

//
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  // implementing Draggable

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @autobind
  dragEndHandler(_: DragEvent): void {
    console.log("DRAG END");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// ProjectList class

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  // could use an enum there but well
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  // Implementing DragTarget interface

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projectId,
      // will suffice
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished,
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      const relevantProjects = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;

    this.element.querySelector("h2")!.textContent =
      `${this.type.toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    const listEL = document.getElementById(
      `${this.type}-projects-list`,
    )! as HTMLUListElement;
    // ofc not the best solution but at least that I can understand for study project (unlike unnecessary complex structure with classes in one fucking file)
    listEL.innerHTML = "";
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }
}

// ProjectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title",
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description",
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people",
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {
    //
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // validation
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 6,
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please, try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    // checking if returned input is correct (I would prefer a guard clause with !userInput check tbh)
    // checking for array since tuple in fact is an array
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}

const input = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
