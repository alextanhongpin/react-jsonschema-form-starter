import { useState } from "react";
import "./App.css";
import Form from "@rjsf/core";

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {
      type: "string",
      title: "Title",
      default: "A new task",
      minLength: 10,
    },
    done: {
      type: "boolean",
      title: "Done?",
      default: false,
    },
  },
};

const uiSchema = {
  title: {
    classNames: "custom-css-class",
    "ui:widget": "MyCustomWidget",
  },
};

const MyCustomWidget = (props) => {
  return (
    <div>
      <h1>Hello</h1>
      <input
        value={props.value}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
const widgets = {
  MyCustomWidget: MyCustomWidget,
};

const log = (type) => console.log.bind(console, type);
function App() {
  const [formData, setFormData] = useState({
    title: "First task",
    done: true,
  });
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      widgets={widgets}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={log("submitted")}
      onError={log("errors")}
    />
  );
}

export default App;
