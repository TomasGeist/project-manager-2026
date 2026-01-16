import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { ProjectPipe } from './projects.pipe';
import { EnvironmentPipe } from './environments.pipe';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body(new ProjectPipe()) dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @Post(':projectId/environments')
  createEnvironment(
    @Param('projectId') projectId: string,
    @Body(new EnvironmentPipe()) dto: CreateEnvironmentDto,
  ) {
    return this.projectsService.createEnvironment({
      ...dto,
      projectId: Number(projectId),
    });
  }

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }


  @Get('/full')
  getProjectsFull(@Param('projectId') projectId: string) {
    return this.projectsService.getProjectsFull();
  }

  @Get(':projectId/full')
  getProjectsFullByIdProject(@Param('projectId') projectId: string) {
    return this.projectsService.getProjectsFullByIdProject(Number(projectId));
  }

  @Get(':projectId/environments')
  getEnvironments(@Param('projectId') projectId: string) {
    return this.projectsService.getEnvironments(Number(projectId));
  }
}
