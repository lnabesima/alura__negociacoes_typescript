import { NegociacoesDoDia } from '../interfaces/negociacoesDoDia.js';
import { Negociacao } from '../models/negociacao.js';

export class NegociacoesService {
  public obterNegociacoes(): Promise<Negociacao[]> {
    return fetch('http://localhost:8080/dados')
      .then(res => res.json())
      .then((dados: NegociacoesDoDia[]) =>
        dados.map(dado => {
          return new Negociacao(new Date(), dado.vezes, dado.montante);
        })
      );
  }
}
