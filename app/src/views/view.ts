import { checkRuntime } from '../decorators/checkRuntime.js';

export abstract class View<Type> {
  protected element: HTMLElement;
  private escapar: boolean = false;

  constructor(selector: string, escapar?: boolean) {
    const elemento = document.querySelector(selector);
    if (elemento) {
      this.element = elemento as HTMLElement;
    } else {
      throw Error(`Seletor ${selector} não existe no DOM. Verifique`);
    }
    if (escapar) {
      this.escapar = escapar;
    }
  }

  protected abstract template(model: Type): string;

  @checkRuntime()
  update(model: Type): void {
    let template = this.template(model);
    if ((this.escapar = true)) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    if (this.element) {
      this.element.innerHTML = template;
    }
  }
}
