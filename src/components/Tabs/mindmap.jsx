import Flow from "src/components/Flow";

export default function MinmapFlow({ topicId, chatId }) {
  return (
    <div className="minMap-flow">
      {/* Mindmap */}
      {/* <div>{topicId}</div>
      <div>{chatId}</div> */}
      <Flow />
    </div>
  );
}
