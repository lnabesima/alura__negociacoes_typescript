export abstract class View<Type> {
  protected element: HTMLElement;
  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  abstract template(model: Type): string;

  update(model: Type): void {
    const template = this.template(model);
    this.element.innerHTML = template;
  }
}
