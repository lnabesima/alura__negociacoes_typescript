import { escape } from '../decorators/escape.js';
import { Negociacoes } from '../models/negociacoes.js';
import { View } from './view.js';

export class NegociacoesView extends View<Negociacoes> {
  @escape
  protected template(model: Negociacoes): string {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
        </th>
      </thead>
      <tbody>
        ${model
          .lista()
          .map(negociacao => {
            return `
            <tr>
            <td>${this.formataData(negociacao.data)}</td>
            <td>${negociacao.quantidade}</td>
            <td>${negociacao.valor}</td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>
    `;
  }

  update(model: Negociacoes): void {
    const template = this.template(model);
    this.element.innerHTML = template;
  }

  private formataData(data: Date): string {
    return new Intl.DateTimeFormat().format(data);
  }
}
