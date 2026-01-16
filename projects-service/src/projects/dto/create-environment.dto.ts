export class CreateEnvironmentDto {
  projectId: number;
  name: string; // dev, staging, prod
  healthUrl: string; // URL que apunta al /health del servicio
}
