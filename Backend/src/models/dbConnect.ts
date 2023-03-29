
import { createPool, Pool  } from "mysql2";
const mysql = require('mysql2')

import * as dotenv from "dotenv";
dotenv.config();

abstract class DbConnect {
  protected connection;
  

  constructor() {
    let connectString = process.env.DATABASE_URL || "mysql://root:root@localhost/bookface"
    this.connection = mysql.createConnection(connectString);
  }
  
  //   abstract findAll(...params:any):Promise<any>;
  //   abstract findOne(...params:any):Promise<any>;
  //   abstract create(...params:any):Promise<any>;
  //   abstract update(...params:any):Promise<any>;
  //   abstract delete(...params:any):Promise<any>;

  close() {
    setTimeout(()=>{
      this.connection.end();
    },1)
  }

}
export default DbConnect;
