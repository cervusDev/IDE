import { envConfig } from "@config/env";
import { generalEnv } from "@environment/general";
import { helperLogger } from "@infra/helper/logger";
import { IFastifyServer } from "@infra/http/server/IFastifyServer";
import { IBootstrap } from "@infra/bootstrap/IBootstrap";

export class Bootstrap implements IBootstrap {
  private readonly server: IFastifyServer;

  constructor(server: IFastifyServer) {
    this.server = server;
  }

  public async start(): Promise<void> {
    try {
      await this.startMiddlewares();
      await this.startRoutes();
      await this.startServer();
    } catch (err) {
      this.handleBootstrapError(err);
    }
  }

  private async startMiddlewares(): Promise<void> {
    await this.server.registerMiddlewares();
    helperLogger.info('✅ Middlewares registrados');
  }

  private async startRoutes(): Promise<void> {
    await this.server.registerRoutes();
    helperLogger.info('✅ Rotas registradas');
  }

  private async startServer(): Promise<void> {
    await this.server.start({ port: envConfig.PORT });
    this.logServerStarted();
  }

  private logServerStarted(): void {
    helperLogger.info(
      `✅ ${generalEnv.name} iniciado na porta ${generalEnv.port}`,
    );
  }

  private handleBootstrapError(err: unknown): void {
    if (err instanceof Error) {
      helperLogger.error({
        message: `🛑 Erro ao iniciar ${generalEnv.name}`,
        stack: err.stack,
        name: err.name,
      });
    } else {
      helperLogger.error(`🛑 Erro desconhecido: ${JSON.stringify(err)}`);
    }
    process.exit(1);
  }
}
