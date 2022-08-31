export function escape(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = originalMethod.apply(this, args);
        if (typeof retorno === `string`) {
            console.log(`@escape em ação na classe ${this.constructor.name} na propriedade ${propertyKey}`);
            retorno = retorno.replace(/<script>[/s/S]*?<\/script>/, '');
        }
        return retorno;
    };
    return descriptor;
}
