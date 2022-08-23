export abstract class View<Type> {
  protected element: HTMLElement;
  private escapar: boolean = false;

  constructor(selector: string, escapar?: boolean) {
    this.element = document.querySelector(selector);
    if (escapar) {
      this.escapar = escapar;
    }
  }

  protected abstract template(model: Type): string;

  update(model: Type): void {
    let template = this.template(model);
    if ((this.escapar = true)) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.element.innerHTML = template;
  }
}
