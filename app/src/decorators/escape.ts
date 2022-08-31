export function escape(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let retorno = originalMethod.apply(this, args);
    if (typeof retorno === `string`) {
      // console.log(
      //   `@escape em ação na classe ${this.constructor.name} na propriedade ${propertyKey}`
      // );
      retorno = retorno.replace(/<script>[/s/S]*?<\/script>/, '');
    }
    return retorno;
  };

  return descriptor;
}
