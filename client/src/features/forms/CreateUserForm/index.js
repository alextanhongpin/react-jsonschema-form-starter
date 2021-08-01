import { useState } from "react";
import Form from "@rjsf/core";
import { useFetchForms } from "features/forms/hooks";
import { createUser } from "features/forms/api";

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

export function CreateUserForm() {
  const [createError, setCreateError] = useState();
  const { data, loading, error } = useFetchForms({
    name: "users",
  });

  const [formData, setFormData] = useState({});

  const handleSubmit = async (schema) => {
    try {
      await createUser("users", schema.formData);
    } catch (error) {
      setCreateError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const form = data?.data?.[0];
  if (!form) return null;

  return (
    <>
      {createError && JSON.stringify(createError)}
      <Form
        schema={form.jsonSchema}
        uiSchema={form.uiSchema}
        formData={formData}
        widgets={widgets}
        onChange={(e) => setFormData(e.formData)}
        onSubmit={handleSubmit}
        noHtml5Validate
      />
    </>
  );
}
