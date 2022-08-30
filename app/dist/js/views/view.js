export class View {
    constructor(selector, escapar) {
        this.escapar = false;
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento;
        }
        else {
            throw Error(`Seletor ${selector} não existe no DOM. Verifique`);
        }
        if (escapar) {
            this.escapar = escapar;
        }
    }
    update(model) {
        let template = this.template(model);
        if ((this.escapar = true)) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        if (this.element) {
            this.element.innerHTML = template;
        }
    }
}
