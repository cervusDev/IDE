import DrizzleORMError from '@infra/database/errors/DrizzleORMError';
import { ICreateUserRepositoryInputData } from './dtos/create/InputData';
import { IUserRepository } from './IUserRepository';
import { drizzleDatabase } from '@infra/database';
import { usersTable } from '@infra/database/schemas';
import { IFindByUserEmailRepositoryInputData } from './dtos/findByEmail/InputData';
import { IFindByUserEmailRepositoryOutputData } from './dtos/findByEmail/OutputData';
import { eq } from 'drizzle-orm';
import { IListUserRepositoryOutputData } from './dtos/list/OutputData';

export class UserRepositoryDatabase implements IUserRepository {
  public async list(): Promise<IListUserRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const users = await database.select().from(usersTable);
      const output: IListUserRepositoryOutputData = {
        list: users.map((item) => ({
          email: item.email,
          id: item.id,
          name: item.name,
          isActive: item.isActive,
        })),
      };
      return output;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
  public async findByEmail(
    inputData: IFindByUserEmailRepositoryInputData,
  ): Promise<IFindByUserEmailRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const [user] = await database
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, inputData.email))
        .limit(1);
      const output: IFindByUserEmailRepositoryOutputData = {
        id: user.id,
        password: user.password,
        isActive: user.isActive,
      };
      return output;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
  public async create(inputData: ICreateUserRepositoryInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database.insert(usersTable).values({
        email: inputData.email,
        name: inputData.name,
        password: inputData.password,
        isActive: inputData.isActive,
      });
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
}
