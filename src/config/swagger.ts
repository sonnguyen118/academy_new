// swagger.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('API ACADEMY')
    .setDescription('The API description for ACADEMY Web - App')
    .setVersion('3.0')
    .addTag('List', 'api cho List dùng chung')
    // .addServer('') // Thêm dòng này để tự động thêm tiền tố "/api"
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
