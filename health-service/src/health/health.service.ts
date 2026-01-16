// health.service.ts
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { ApiResponse } from 'src/commons/api-response';
import { RESPONSE_CODES } from 'src/commons/codes-response';

type HealthEnvironment = {
  name: string;
  healthUrl: string;
};

type HealthProject = {
  name: string;
  environments: HealthEnvironment[];
};

type HealthSummaryEntry = {
  project: string;
  environment: string;
  url: string;
  status: string;
};

type ProjectsResponse = {
  data: HealthProject[];
};

@Injectable()
export class HealthService {

  //Función para poder utilizar localhost entre contenedores
  private resolveHealthUrl(rawUrl: string) {
    if (!rawUrl) {
      return rawUrl;
    }

    try {
      const parsed = new URL(rawUrl);
      if (parsed.hostname !== 'localhost') {
        return rawUrl;
      }

      const bridgeHost = process.env.CONTAINER_LOCALHOST_HOST ?? 'host.docker.internal';
      parsed.hostname = bridgeHost;
      return parsed.toString();
    } catch {
      return rawUrl;
    }
  }

  async getHealthSummary() {
    // Traemos la respuesta completa
    let projects: HealthProject[] = [];
    const projectsServiceBaseUrl = process.env.PROJECTS_SERVICE_URL ?? 'http://localhost:4000';
    const projectsEndpoint = `${projectsServiceBaseUrl.replace(/\/+$/, '')}/projects/full`;

    try {
      const response = await fetch(projectsEndpoint);
      const payload = (await response.json()) as ProjectsResponse;
      projects = Array.isArray(payload.data) ? payload.data : [];
    } catch {
      // default projects already [] cuando el servicio remoto falla
    }

    const summary: HealthSummaryEntry[] = [];

    for (const project of projects) {
      for (const env of project.environments) {
        let status = 'DOWN';
        const targetUrl = this.resolveHealthUrl(env.healthUrl);
        try {
          const res = await fetch(targetUrl);
          status = res.ok ? 'UP' : 'DOWN';
        } catch {}
        summary.push({
          project: project.name,
          environment: env.name,
          url: env.healthUrl,
          status,
        });
      }
    }

    return new ApiResponse(RESPONSE_CODES.SUCCESS, 'Health summary retrieved', summary);
  }
}