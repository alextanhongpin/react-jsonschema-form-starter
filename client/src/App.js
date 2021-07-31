import { useState } from "react";
import Form from "@rjsf/core";
import { useFetchForms } from "features/forms";

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

function App() {
  const { data, loading, error } = useFetchForms({
    name: "registration_form",
  });

  // TODO: Load form data alongside.
  const [formData, setFormData] = useState({
    firstName: "john",
  });
  const handleSubmit = (formData) => console.log("submit:", formData);
  const handleError = (error) => console.log("error:", error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const form = data?.data?.[0];
  if (!form) return null;

  return (
    <>
      <Form
        schema={form.jsonSchema}
        uiSchema={form.uiSchema}
        formData={formData}
        widgets={widgets}
        onChange={(e) => setFormData(e.formData)}
        onSubmit={handleSubmit}
        onError={handleError}
        noHtml5Validate
      />
    </>
  );
}

export default App;
