import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Cuenta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigocuenta: string;

  @property({
    type: 'string',
    required: true,
  })
  creditcard: string;

  @property({
    type: 'number',
    required: true,
  })
  saldo: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Cuenta>) {
    super(data);
  }
}

export interface CuentaRelations {
  // describe navigational properties here
}

export type CuentaWithRelations = Cuenta & CuentaRelations;
