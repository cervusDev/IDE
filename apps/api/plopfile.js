import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const templatePath = "src/shared/plop";

export default function (plop) {
  plop.setActionType("mkdir", (answers, config) => {
    const dirPath = plop.renderString(config.path, answers);
    const fullPath = path.resolve(plop.getDestBasePath(), dirPath);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      return `Diretório criado: ${dirPath}`;
    }

    return `Diretório já existe: ${dirPath}`;
  });

  plop.setActionType("exec", (answers, config) => {
    try {
      execSync(config.command, {
        stdio: "inherit",
        cwd: plop.getDestBasePath(),
      });

      return `Comando executado: ${config.command}`;
    } catch (error) {
      throw new Error(`Erro ao executar comando: ${config.command}`);
    }
  });

  plop.setHelper("lowerFirst", (text) => {
    if (!text) return "";
    return text.charAt(0).toLowerCase() + text.slice(1);
  });

  plop.setGenerator("init", {
    description: "criar um projeto completo.",
    prompts: [],
    actions: () => {
      const actions = [
        {
          type: "add",
          path: "src/starter.ts",
          templateFile: `${templatePath}/Starter.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/errorHandler/FastifyErrorHandler.ts",
          templateFile: `${templatePath}/FastifyErrorHandler.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/errorHandler/IFastifyErrorHandler.ts",
          templateFile: `${templatePath}/IFastifyErrorHandler.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/config/enums.ts",
          templateFile: `${templatePath}/EEnvironment.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/config/env.ts",
          skipIfExists: true,
          templateFile: `${templatePath}/EnvConfig.hbs`,
        },
        {
          type: "add",
          path: "src/infra/helper/logger.ts",
          templateFile: `${templatePath}/Logger.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/enums/HttpCode.ts",
          templateFile: `${templatePath}/HttpCode.hbs`,
          skipIfExists: true,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/errors/BaseError.ts",
          templateFile: `${templatePath}/BaseError.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/server/FastifiServer.ts",
          templateFile: `${templatePath}/FastifyServer.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/server/IFastifyServer.ts",
          templateFile: `${templatePath}/IFastifyServer.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/environment/general.ts",
          templateFile: `${templatePath}/EnvGeneral.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/errors/HostNotAllowedError.ts",
          templateFile: `${templatePath}/HostNotAllowedError.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/config/cors.ts",
          templateFile: `${templatePath}/Cors.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/errors/RateLimitError.ts",
          templateFile: `${templatePath}/RateLimitError.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/routes/index.ts",
          templateFile: `${templatePath}/Route.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/routes/IRoute.ts",
          templateFile: `${templatePath}/IRoute.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/routes/IFastifyRoutes.ts",
          templateFile: `${templatePath}/IFastifyRoutes.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/routes/FastifyRoutes.ts",
          templateFile: `${templatePath}/FastifyRoutes.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/middlewares/FastifyMiddleware.ts",
          templateFile: `${templatePath}/FastifyMiddleware.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/http/middlewares/IFastifyMiddlewares.ts",
          templateFile: `${templatePath}/IFastifyMiddleware.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/shared/interfaces/IMiddleware.ts",
          templateFile: `${templatePath}/IMiddleware.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/bootstrap/index.ts",
          templateFile: `${templatePath}/Bootstrap.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/infra/bootstrap/IBootstrap.ts",
          templateFile: `${templatePath}/IBootstrap.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/@types/fastify.d.ts",
          templateFile: `${templatePath}/Fastify.d.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/shared/interfaces/IController.ts",
          templateFile: `${templatePath}/IController.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "src/shared/interfaces/IUseCase.ts",
          templateFile: `${templatePath}/IUseCase.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "tsconfig.json",
          templateFile: `${templatePath}/TSConfig.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: ".eslintrc.json",
          templateFile: `${templatePath}/ESLint.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: ".prettierrc",
          templateFile: `${templatePath}/Prettier.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "Dockerfile",
          templateFile: `${templatePath}/Dockerfile.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "docker-compose.yml",
          templateFile: `${templatePath}/DockerCompose.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: "drizzle.config.ts",
          templateFile: `${templatePath}/DrizzleConfig.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: ".editorconfig",
          templateFile: `${templatePath}/EditorConfig.hbs`,
          skipIfExists: true,
        },
        {
          type: "add",
          path: ".env.example",
          templateFile: `${templatePath}/EnvExample.hbs`,
          skipIfExists: true,
        },
        {
          type: "exec",
          command: "pnpm add -D typescript tsx @types/node",
        },
        {
          type: "exec",
          command: "pnpm add @fastify/cors",
        },
        {
          type: "exec",
          command: "pnpm add fastify-type-provider-zod",
        },
        {
          type: "exec",
          command: "pnpm add qs",
        },
        {
          type: "exec",
          command: "pnpm add -D @types/qs",
        },
        {
          type: "exec",
          command: "pnpm add @fastify/rate-limit",
        },
        {
          type: "exec",
          command: "pnpm add winston",
        },
        {
          type: "exec",
          command: "pnpm add drizzle-orm pg dotenv",
        },
        {
          type: "exec",
          command: "pnpm add -D drizzle-kit tsx @types/pg",
        },
        {
          type: "exec",
          command: "pnpm add zod zod-validation-error",
        },
        {
          type: "exec",
          command:
            "pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import prettier eslint",
        },
      ];
      return actions;
    },
  });
}
