import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// postgres://zjlzxeur:uZQua72rbKJZMBxk_y_T3hzZivUCVxYh@john.db.elephantsql.com/zjlzxeur

const ORMConfig: PostgresConnectionOptions = {

    type: 'postgres',
    host: 'zjlzxeur',
    port: 5432,
    username: 'postgres',
    password: '231223',
    database: 'social_iiitnr',
    entities: [
        'dist/src/**/*.entity.js',
    ],
    synchronize: true,
    // migrations : [
    //     'dist/src/database/migrations/*.js'
    // ],
    // cli:{
    //      migrationsDir:'src/database/migrations'
    // }
}

export default ORMConfig