export abstract class View<Type> {
  protected element: HTMLElement;

  constructor(selector: string /*escapar?: boolean*/) {
    const elemento = document.querySelector(selector);
    if (elemento) {
      this.element = elemento as HTMLElement;
    } else {
      throw Error(`Seletor ${selector} não existe no DOM. Verifique`);
    }
  }

  protected abstract template(model: Type): string;

  update(model: Type): void {
    let template = this.template(model);
    if (this.element) {
      this.element.innerHTML = template;
    }
  }
}
