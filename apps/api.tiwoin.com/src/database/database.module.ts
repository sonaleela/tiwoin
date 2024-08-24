import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from "mongodb";

export const MONGODB_DATABASE = 'MONGODB_CONNECTION';

const mongoProvider: Provider = {
    provide: MONGODB_DATABASE,
    useFactory: (configService: ConfigService) => {
        const mongoClient = new MongoClient((<string>configService.get('MONGODB_URI')));
        const db = mongoClient.db((<string>configService.get('MONGODB_DATABASE_NAME')));
        return db;
    },
    inject: [ConfigService],
};

@Global()
@Module({
    providers: [mongoProvider],
    exports: [mongoProvider],
})
export class DatabaseModule { }
