import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cliente, ClienteRelations, Cuenta} from '../models';
import {CuentaRepository} from './cuenta.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly cuentas: HasManyRepositoryFactory<Cuenta, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('CuentaRepository') protected cuentaRepositoryGetter: Getter<CuentaRepository>,
  ) {
    super(Cliente, dataSource);
    this.cuentas = this.createHasManyRepositoryFactoryFor('cuentas', cuentaRepositoryGetter,);
    this.registerInclusionResolver('cuentas', this.cuentas.inclusionResolver);
  }
}
