import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  // Register helmet
  app.use(helmet())
  // Register CORS
  app.enableCors({ origin: 'http://localhost:5371' })
  // Configure Swagger
  const config = new DocumentBuilder().setTitle('Lotto Forecast').setDescription('Lott Forecast API').setVersion('1.0').addTag('Games').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT, () => console.log(`Server listen at ${PORT}`))
}
bootstrap()
