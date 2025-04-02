import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { DatabaseModule } from "./database.module";
import { AppModule } from "./app.module";

const modules = []
@Module({
  imports: [
    RouterModule.register(
        [
    {        path: 'ecovault/v1',
            children:modules,
    }    ]
    ),
    AppModule,
    DatabaseModule,

  ],
})

export class V1Module {}