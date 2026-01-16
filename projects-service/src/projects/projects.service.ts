import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { ApiResponse } from 'src/commons/api-response';
import { RESPONSE_CODES } from 'src/commons/codes-response';


@Injectable()
export class ProjectsService {
private projects = [
  { id: 1, name: 'Auth Service', description: 'Servicio de autenticación' },
  { id: 2, name: 'Projects Service', description: 'Gestión de proyectos y environments' },
];

private environments = [
  { id: 1, projectId: 1, name: 'dev', healthUrl: 'http://localhost:3000/health' },
  { id: 2, projectId: 1, name: 'staging', healthUrl: 'http://localhost:3001/health' },
  { id: 3, projectId: 1, name: 'prod', healthUrl: 'http://localhost:3002/health' },

  { id: 4, projectId: 2, name: 'dev', healthUrl: 'http://localhost:4000/health' },
  { id: 5, projectId: 2, name: 'staging', healthUrl: 'http://localhost:4001/health' },
  { id: 6, projectId: 2, name: 'prod', healthUrl: 'http://localhost:4002/health' },
];


  createProject(dto: CreateProjectDto) {
    const project = { id: this.projects.length + 1,
      name: dto.name,
      description: dto.description ?? ''};
      
    this.projects.push(project);

     
    return new ApiResponse(RESPONSE_CODES.SUCCESS, 'Proyecto creado con exito', project);
  }

  createEnvironment(dto: CreateEnvironmentDto) {
     const projectExists = this.projects.find(p => p.id === dto.projectId);
      if (!projectExists) {
        return new ApiResponse(RESPONSE_CODES.BAD_REQUEST, 'Proyecto no encontrado', null);
      }

      const envExists = this.environments.find(
        e => e.projectId === dto.projectId && e.name === dto.name,
      );
      if (envExists) {
        return new ApiResponse(RESPONSE_CODES.CONFLICT, 'El entorno ya existe', null);
      }

      const env = { id: this.environments.length + 1, ...dto };
      this.environments.push(env);
      return new ApiResponse(RESPONSE_CODES.SUCCESS, 'Entorno creado con éxito', env);
  }

  getProjects() {
    return new ApiResponse(RESPONSE_CODES.SUCCESS, 'Proyectos recuperados con éxito', this.projects);
  }

   getProjectsFull() {

    let projectsWithEnvironments = this.projects.map(project => {
      const envs = this.environments.filter(env => env.projectId === project.id);
      return { ...project, environments: envs };
    });

    return new ApiResponse(RESPONSE_CODES.SUCCESS, 'Proyectos recuperados con éxito', projectsWithEnvironments);
  }

  getProjectsFullByIdProject(projectId: number) {
    let project = this.projects.find(p => p.id === projectId);
    if (!project) {
      return new ApiResponse(RESPONSE_CODES.NOT_FOUND, 'Proyecto no encontrado', null);
    }
    const envs = this.environments.filter(env => env.projectId === projectId);
    return new ApiResponse(RESPONSE_CODES.SUCCESS, 'Proyecto recuperado con éxito', { ...project, environments: envs });
  }

  getEnvironments(projectId?: number) {

    if (projectId) {
      return  new ApiResponse(RESPONSE_CODES.SUCCESS, 'Entornos recuperados con éxito', this.environments.filter(e => e.projectId === projectId));
    }
    return new ApiResponse(RESPONSE_CODES.SUCCESS, 'Entornos recuperados con éxito', this.environments);
  }
}
