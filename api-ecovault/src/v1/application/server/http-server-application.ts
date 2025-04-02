import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import RootModule from '../dependency-inversion/root.module';

const apiHost = '0.0.0.0';
const apiPort = '3000';

export default class HttpServerApplication {
    public async run(): Promise<void> {
        const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule);

        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });

        this.buildAPIDocumentation(app);
        this.log();
        await app.listen(apiPort, apiHost);
    }

    private buildAPIDocumentation(app: NestExpressApplication): void {
        const options = new DocumentBuilder()
            .setTitle('API')
            .setDescription('API')
            .setVersion('1.0')
            .addTag('API')
            .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api', app, document);
    }

    private log(): void {
        console.log('Server running at http://localhost:3000', HttpServerApplication.name);
    }

    public static new(): HttpServerApplication {
        return new HttpServerApplication();
    }
}
