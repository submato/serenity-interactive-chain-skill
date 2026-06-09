import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Text,
  useCanvasAction,
  useCanvasState,
} from "cursor/canvas";

type Node = {
  id: string;
  parentId?: string;
  label: string;
  summary: string;
  marketStatus: "underfollowed" | "repricing" | "crowded" | "too-early";
  evidence: "strong-evidence" | "reported" | "inferred" | "needs-verification";
  chokepoint: "current-chokepoint" | "candidate-chokepoint" | "priced-chokepoint" | "future-chokepoint";
};

const nodes: Node[] = [
  {
    id: "root",
    label: "Example Ecosystem",
    summary: "A minimal expandable supply-chain map.",
    marketStatus: "repricing",
    evidence: "reported",
    chokepoint: "candidate-chokepoint",
  },
  {
    id: "D1",
    parentId: "root",
    label: "Business Domain",
    summary: "A domain that should be mapped before naming stocks.",
    marketStatus: "underfollowed",
    evidence: "inferred",
    chokepoint: "current-chokepoint",
  },
  {
    id: "D1-N1",
    parentId: "D1",
    label: "Bottleneck Node",
    summary: "A layer where supply may become constrained.",
    marketStatus: "underfollowed",
    evidence: "reported",
    chokepoint: "current-chokepoint",
  },
];

function childrenOf(id: string) {
  return nodes.filter((node) => node.parentId === id);
}

function NodeTags({ node }: { node: Node }) {
  return (
    <Row gap={6} wrap>
      <Pill size="sm">{node.marketStatus}</Pill>
      <Pill size="sm">{node.evidence}</Pill>
      <Pill size="sm">{node.chokepoint}</Pill>
    </Row>
  );
}

function ActionButtons({ node }: { node: Node }) {
  const dispatch = useCanvasAction();
  const openTask = (task: string) => {
    dispatch({
      type: "newComposerChat",
      userPrompt: `Use serenity-interactive-chain. Target node: ${node.id} (${node.label}). Task: ${task}. Update the current canvas file.`,
    });
  };

  return (
    <Grid columns={4} gap={8}>
      <Button variant="primary" onClick={() => openTask("Generate sublayers")}>
        Generate
      </Button>
      <Button variant="secondary" onClick={() => openTask("Add evidence")}>
        Evidence
      </Button>
      <Button variant="secondary" onClick={() => openTask("Map local stocks")}>
        Map
      </Button>
      <Button variant="secondary" onClick={() => openTask("Re-evaluate")}>
        Re-evaluate
      </Button>
    </Grid>
  );
}

export default function MinimalMindmap() {
  const [selectedId, setSelectedId] = useCanvasState("selected", "D1-N1");
  const selected = nodes.find((node) => node.id === selectedId) || nodes[0];
  const siblings = selected.parentId ? childrenOf(selected.parentId) : childrenOf(selected.id);

  return (
    <Stack gap={16}>
      <H1>Serenity Interactive Chain: Minimal Mindmap</H1>
      <Grid columns="1fr 1fr 1.2fr" gap={12} align="start">
        <Card>
          <CardHeader>Mindmap</CardHeader>
          <CardBody>
            <Stack gap={8}>
              {nodes.map((node) => (
                <Button key={node.id} variant={selected.id === node.id ? "primary" : "secondary"} onClick={() => setSelectedId(node.id)}>
                  {node.label}
                </Button>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Sibling Nodes</CardHeader>
          <CardBody>
            <Stack gap={8}>
              {siblings.map((node) => (
                <Button key={node.id} variant={selected.id === node.id ? "primary" : "secondary"} onClick={() => setSelectedId(node.id)}>
                  {node.label}
                </Button>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Node Detail</CardHeader>
          <CardBody>
            <Stack gap={10}>
              <Text size="small" tone="tertiary">{selected.id}</Text>
              <H2>{selected.label}</H2>
              <NodeTags node={selected} />
              <Text>{selected.summary}</Text>
              <ActionButtons node={selected} />
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}
