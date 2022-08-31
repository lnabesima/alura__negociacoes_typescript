export class View {
    constructor(selector) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento;
        }
        else {
            throw Error(`Seletor ${selector} não existe no DOM. Verifique`);
        }
    }
    update(model) {
        let template = this.template(model);
        if (this.element) {
            this.element.innerHTML = template;
        }
    }
}
