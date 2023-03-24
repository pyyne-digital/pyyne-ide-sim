import { TerminalLine } from "../Previews/Terminal/props";

export const code = `
const stripe = require('stripe')('sk_test');

await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd'
});
`;

export const longCode = `import * as Pyyne from 'interfaces/PYYNE';
import { Correlated } from 'interfaces/Correlation';

const { projects } = Pyyne.Types;

export default new (class ProjectService extends Pyyne.Service {
  public async GetProjects(params?: GetProjectsParams): Promise<Project[]> {
    const result = await Pyyne.Service.get<PYYNE.Project[]>('/projects', {
      params: getProjects.params.out(params),
    });

    return result.data.map(projects.in);
  }

  public async GetProject(id: Id, params?: GetProjectParams): Promise<Project> {
    const result = await Pyyne.Service.get<PYYNE.Project>(\`/project/\${id}\`, {
      params: getProjects.params.out(params),
    });

    return projects.in(result.data);
  }

  public async GetPaginatedProjects(
    params: PaginationParams & GetProjectsParams,
  ): Promise<Paginated<Project[]>> {
    const result = await Pyyne.Service.get<PYYNE.Paginated<PYYNE.Project[]>>(
      \`/projects/page/\${params.pageIndex}\`,
      {
        params: getProjects.params.out(params),
      },
    );

    return result.paginated(projects.in);
  }

  public async GetProjectsByConsultants(
    params: GetProjectsParams & ConsultantRelationQuery,
  ): Promise<Correlated<Project[]>> {
    const result = await Pyyne.Service.get<PYYNE.Paginated<PYYNE.Project[]>>(
      \`/projects\`,
      {
        params: getProjects.params.out(params),
      },
    );

    return result.correlated(projects.in);
  }

  public async GetPaginatedProjectsByConsultants(
    params: GetProjectsParams & ConsultantRelationQuery & PaginationParams,
  ): Promise<Correlated<Project[]> & Paginated<Project[]>> {
    const result = await Pyyne.Service.get<
      PYYNE.Paginated<PYYNE.Project[]> & PYYNE.Correlated<PYYNE.Project[]>
    >(\`/projects\`, {
      params: getProjects.params.out(params),
    });

    return {
      ...result.correlated(projects.in),
      ...result.paginated(projects.in),
    };
  }

  public async CreateProject(form: CreateProjectForm): Promise<Project> {
    const { data } = await Pyyne.Service.post<
      PYYNE.Project,
      PYYNE.Requests.PostProject.Body
    >('/projects', createProject.body.out(form));

    return projects.in(data);
  }

  public async EditProject(
    id: number,
    form: EditProjectForm,
  ): Promise<Project> {
    const { data } = await Pyyne.Service.patch<
      PYYNE.Project,
      PYYNE.Requests.PatchProject.Body
    >(\`/projects/\${id}\`, editProject.body.out(form));

    return projects.in(data);
  }

  public async DeleteProject(id: number): Promise<boolean> {
    const { status } = await Pyyne.Service.delete(\`/projects/\${id}\`);

    return status === 204;
  }
})();
`;

export const terminalOutput: TerminalLine[] = [
  {
    type: "input",
    pre: "$ ",
    pos: "",
    delay: 150,
    content: "node server && stripe listen",
  },
  {
    type: "output",
    delay: 50,
    content: "> Ready! Waiting for requests...",
  },
  {
    type: "output",
    delay: 200,
    content: "2023-03-01 14:45:22 [200] payment_intent.created",
  },
  {
    type: "output",
    delay: 500,
    content: "2023-03-01 14:45:22 [200] charge.succeeded",
  },
  {
    type: "output",
    delay: 50,
    content: "2023-03-01 14:45:22 [200] payment_intent.succeeded",
  },
];
