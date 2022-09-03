import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { checkRuntime } from '../decorators/checkRuntime.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/domInjector.js';
import { NegociacoesService } from '../services/negociacoesServices.js';

export class NegociacaoController {
  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @checkRuntime()
  @inspect()
  adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.verificaDiaUtil(negociacao.data)) {
      this.mensagemView.update(
        'Apenas negociações realizadas em dias úteis são aceitas.'
      );
      return;
    }
    this.negociacoes.adiciona(negociacao);
    this.atualizaView();
    this.limparFormulario();
  }

  public importaDados(): void {
    this.negociacoesService.obterNegociacoes().then(negociacoesDeHoje => {
      for (let negociacao of negociacoesDeHoje) {
        this.negociacoes.adiciona(negociacao);
      }
      this.negociacoesView.update(this.negociacoes);
    });
  }

  private verificaDiaUtil(data: Date): boolean {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SÁBADO
    );
  }

  private limparFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update(`Negociação adicionada com sucesso!`);
  }
}
