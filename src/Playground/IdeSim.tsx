import { useEffect, useState } from "react";
import { Playground } from "../interfaces/Playground";

import * as IdeSim from "../";
import { TerminalLine } from "../Previews/Terminal/props";

interface Props {
  Playground: Playground;
}

const test = `import * as Pyyne from 'interfaces/PYYNE';
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

export function Example({ Playground }: Props) {
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [editable, setEditable] = useState(false);
  const [showColourControls, setShowColourControls] = useState(false);
  const theme = useState(IdeSim.themes.PYYNE);

  const [code, setCode] = useState(test);

  const [terminalText, setTerminalText] = useState<TerminalLine[]>(
    `$ node server.is && stripe listen
  > Ready! Waiting for requests...
  2023-03-01 14:45:22 [200] payment_intent.created
  2023-03-01 14:45:22 [200] charge.succeeded
  2023-03-01 14:45:22 [200] payment_intent.succeeded
  `
      .split("\n")
      .map((text, i) => {
        const type = !i ? "input" : "output";
        return {
          content: text,
          type,
          animation: {
            delay: i === 1 ? 0 : Math.random() * 2000,
            interval: 100,
          },
        } as TerminalLine;
      })
  );

  return (
    <Playground.Container>
      <Playground.Showcase onSizeChange={setSize}>
        <IdeSim.SelfTypingIdeSimulator
          theme="PYYNE"
          language="typescript"
          context={{
            theme,
            code: { editable, colours: {}, content: code },
            preview: { terminal: { content: terminalText } },
          }}
        >
          {code}

          <IdeSim.Previews.Terminal>{terminalText}</IdeSim.Previews.Terminal>
        </IdeSim.SelfTypingIdeSimulator>
      </Playground.Showcase>

      <Playground.ControlPanel>
        <IdeSim.Playground.ControlPanel
          theme={theme}
          width={width}
          height={height}
          editableState={[editable, setEditable]}
          codeState={[code, setCode]}
          colourControlsState={[showColourControls, setShowColourControls]}
          terminalTextState={[terminalText, setTerminalText]}
        />
      </Playground.ControlPanel>
    </Playground.Container>
  );
}
