import { useFormContext, Controller } from "react-hook-form";

const DocsBlock: React.FC<{ docs: string }> = ({ docs }) => {
  return (
    <>
      {docs && (
        <div>
          <p>documentation</p>
          <pre>{docs}</pre>
        </div>
      )}
    </>
  );
};

export default DocsBlock;
