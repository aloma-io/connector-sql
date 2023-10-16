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
  }): Promise<{ fields: any[]; rows: any[] }> {
    var local = this,
      knex = local.knex;

    const res = await knex.raw(query, values);

    const ret: { fields: any[]; rows: any[] } = { fields: [], rows: [] };

    if (res.fields) {
      ret.fields = res.fields;
    }

    if (res.rows) {
      ret.rows = res.rows;
    }

    return ret;
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
  }): Promise<{ rowCount: number; rows: any[] }> {
    var local = this,
      knex = local.knex;

    const res = await knex.raw(query, values);

    return { rowCount: res.rowCount, rows: res.rows };
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
  }): Promise<any[]> {
    var local = this,
      knex = local.knex;

    const res = await knex.raw(query, values);

    return res.rows;
  }
}
