import React from "react";
import styles from "./VariablesEditor.module.css";

export interface Variable {
  key: string;
  value: string;
}

interface VariablesEditorProps {
  variables: Variable[];
  setVariables: (variables: Variable[]) => void;
}

const VariablesEditor: React.FC<VariablesEditorProps> = ({
  variables,
  setVariables,
}) => {
  const addVariable = (e: React.MouseEvent) => {
    e.preventDefault(); // Остановка отправки формы
    setVariables([...variables, { key: "", value: "" }]);
  };

  const updateVariable = (index: number, key: string, value: string) => {
    const validKey = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(key);

    if (!validKey) {
      console.warn(`Invalid variable key: "${key}"`);
      return;
    }

    const updatedVariables = variables.map((variable, i) =>
      i === index ? { key, value } : variable,
    );
    setVariables(updatedVariables);
  };

  const removeVariable = (index: number) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
  };

  return (
    <div className={styles.variablesEditor}>
      <button
        type="button"
        className={styles.addVariableButton}
        onClick={addVariable}
      >
        Add Variable
      </button>
      {variables.map((variable, index) => (
        <div className={styles.variableEntry} key={index}>
          <input
            type="text"
            className={styles.variableInput}
            placeholder="Variable Key"
            value={variable.key}
            onChange={(e) =>
              updateVariable(index, e.target.value, variable.value)
            }
          />
          <input
            type="text"
            className={styles.variableInput}
            placeholder="Variable Value"
            value={variable.value}
            onChange={(e) =>
              updateVariable(index, variable.key, e.target.value)
            }
          />
          <button
            type="button"
            className={styles.removeVariableButton}
            onClick={() => removeVariable(index)}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default VariablesEditor;
