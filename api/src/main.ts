import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { ThreeWeeksModule } from './three-weeks/three-weeks.module'
import { TwoWeeksModule } from './two-weeks/two-weeks.module'
import { DataModule } from './data/data.module'
import { CorsOptions } from 'config/index.config'
import { urlencoded, json } from 'express'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Access environment variables service
  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  // //Increase payload size
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  // Register helmet
  app.use(helmet())
  // Register CORS
  app.enableCors()
  // Set global prefix for all routes
  app.setGlobalPrefix('api')
  // Configure Swagger
  const config = new DocumentBuilder().setTitle('Lotto Forecast').setDescription('Lotto Forecast API').setVersion('1.0').addTag('Games').build()
  const document = SwaggerModule.createDocument(app, config, { include: [ThreeWeeksModule, TwoWeeksModule, DataModule, AuthModule, UsersModule] })
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT, () => console.log(`Server listen at ${PORT}`))
}
bootstrap()
