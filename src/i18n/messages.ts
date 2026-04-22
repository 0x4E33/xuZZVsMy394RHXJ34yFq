type MessageTree = Record<string, unknown>;

function getNestedMessage(messages: MessageTree, path: string) {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    return (current as MessageTree)[segment];
  }, messages);
}

function setNestedMessage(messages: MessageTree, path: string, value: unknown) {
  const segments = path.split(".");
  let current: MessageTree = messages;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      current[segment] = value;
      return;
    }

    const next = current[segment];
    if (!next || typeof next !== "object") {
      current[segment] = {};
    }

    current = current[segment] as MessageTree;
  });
}

export function pickMessages(messages: MessageTree, namespaces: string[]) {
  const picked: MessageTree = {};

  namespaces.forEach((namespace) => {
    const value = getNestedMessage(messages, namespace);

    if (value !== undefined) {
      setNestedMessage(picked, namespace, value);
    }
  });

  return picked;
}
