export function escape(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = originalMethod.apply(this, args);
        if (typeof retorno === `string`) {
            retorno = retorno.replace(/<script>[/s/S]*?<\/script>/, '');
        }
        return retorno;
    };
    return descriptor;
}
