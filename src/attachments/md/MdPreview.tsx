import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MdPreview({text}: {text: string}) {
  return (
    <div className="p-6 gap-2">
        <div className="prose prose-invert max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
        </div>
    </div>
  );
}
