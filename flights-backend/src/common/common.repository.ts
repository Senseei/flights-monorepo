import { FindOptionsWhere, Repository } from 'typeorm';
import { DomainEntity } from '@common/domain.entity';

export abstract class CRUDRepository<E extends DomainEntity> {
  protected constructor(protected readonly repository: Repository<E>) {}

  public async findById(id: number): Promise<E | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<E>,
    });
  }

  public async findAll(): Promise<E[]> {
    return this.repository.find();
  }

  public async save(entity: E): Promise<E> {
    return this.repository.save(entity);
  }

  public async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id } as FindOptionsWhere<E>);
  }

  public async delete(entity: E): Promise<void> {
    await this.repository.remove(entity);
  }
}