import { PluginElementRenderProps, YooptaPlugin } from '@yoopta/editor';

const HeadingTwoRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, HTMLAttributes = {}, attributes, children } = props;
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  if (extendRender) return extendRender(props);

  return (
    <h2 id={element.id} draggable={false} className={`yoopta-heading-two ${className}`} {...htmlAttrs} {...attributes}>
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = new YooptaPlugin({
  type: 'HeadingTwo',
  elements: {
    'heading-two': {
      render: HeadingTwoRender,
      props: {
        nodeType: 'block',
      },
    },
  },
  options: {
    display: {
      title: 'Heading 2',
      description: 'Medium section heading',
    },
    shortcuts: ['h2', '##'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['H2'],
      },
      serialize: (element, text) => {
        return `<h2>${text}</h2>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `## ${text}\n`;
      },
    },
  },
});

export { HeadingTwo };
