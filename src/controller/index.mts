import { AbstractController } from "@aloma.io/integration-sdk";
import Knex from "knex";

export default class Controller extends AbstractController {
  private knex: any;

  protected async start(): Promise<void> {
    const config = this.config;

    if (this.knex) {
      try {
        await this.knex.destroy();
      } catch (e) {
        // blank
      }
    }

    this.knex = Knex.knex({
      client: config.type,
      connection: {
        host: config.host,
        port: config.port * 1,
        user: config.user,
        password: config.password,
        database: config.database,
      },
      pool: { min: 0, max: 10 },
    });
  }

  /**
   * run a sql query
   * @param query - the sql query, e.g. `update users set name = ? where id = ?`
   * @param values - values for the placeholders (`?`), if any
   * @example usage
   * ```js
   * query({query: 'update users set name = ? where id = ?', values: ['John Doe', 10]});
   * ```
   **/
  async query({
    query,
    values = [],
  }: {
    query: string;
    values: any[];
  }): Promise<any> {
    var local = this,
      knex = local.knex;

    const res = await knex.raw(query, values);

    return res;
  }

  /**
   * insert rows into a table
   * @param query - the sql query, e.g. `insert into users (name, age) values (?, ?)`
   * @param values - values for the placeholders (`?`), if any
   * @example usage
   * ```js
   * insert({query: 'insert into users (name, age) values (?, ?)', values: ['John Doe', 42]});
   * ```
   **/
  async insert({
    query,
    values = [],
  }: {
    query: string;
    values: any[];
  }): Promise<any> {
    var local = this,
      knex = local.knex;

    const res = await knex.raw(query, values);

    return res;
  }

  /**
   * do a sql select
   * @param query - the sql query, e.g. `select * from users where name = ?`
   * @param values - values for the placeholders (`?`), if any
   * @example usage
   * ```js
   * select({query: 'select * from users where name = ?', values: ['John Doe']});
   * ```
   **/
  async select({
    query,
    values = [],
  }: {
    query: string;
    values: any[];
  }): Promise<any> {
    var local = this,
      knex = local.knex;

    const res = await knex.raw(query, values);

    if (Array.isArray(res) && Array.isArray(res[0])) {
      // mysql
      return res[0];
    } else if (res.rows) {
      // postgres
      return res.rows;
    }

    return res;
  }
}
