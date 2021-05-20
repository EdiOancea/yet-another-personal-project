import React, {useState, Fragment} from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';

const defaultCode = `

// Compute the sum of the numbers
// arguments: array: [string]

const arraySum = (...array) => {
    return array.map(Number).reduce((a, b) => a + b, 0);
}

// This part is required for proper execution
// DO NOT MODIFY
const [j1, j2, ...array] = process.argv;
console.log(arraySum(...array));
`;
const Editor = () => {
  const [value, setValue] = useState(defaultCode);

  const onSubmit = () => {
    fetch(
      'https://emkc.org/api/v1/piston/execute',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          language: 'js',
          source: value,
          args: [10, 1, 2, 3, 4],
        }),
      }
    )
      .then(res => res.json())
      .then(res => JSON.parse(console.log(res.output)));
  };

  return (
    <AceEditor
      placeholder="Solve this"
      mode="javascript"
      theme="github"
      name="id"
      onLoad={() => console.log('loaded')}
      onChange={setValue}
      fontSize={14}
      showPrintMargin
      showGutter
      highlightActiveLine
      value={value}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 4,
      }}
    />
  );
};

export default Editor;
