import { useFormContext, Controller } from "react-hook-form";

interface ResponseBlockProps {
  response?: string;
  status?: string;
}

const ResponseBlock: React.FC<ResponseBlockProps> = ({ response, status }) => {
  return (
    <div>
      <label htmlFor="status">response status</label>
      <input id="status" readOnly value={status}></input>
      <label htmlFor="response">response</label>
      <pre id="response">{response}</pre>
    </div>
  );
};

export default ResponseBlock;
