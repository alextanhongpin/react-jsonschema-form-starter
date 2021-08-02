import { useState } from "react";
import Form from "@rjsf/core";
import { useParams } from "react-router-dom";

import { useFetchForms } from "features/forms/hooks";
import { create } from "features/forms/api";
import { widgets } from "features/forms/widgets";

export function CreateForm() {
  const { formName } = useParams();
  const [createError, setCreateError] = useState();
  const { data, loading, error } = useFetchForms({
    name: formName,
  });

  const [formData, setFormData] = useState({});

  const handleSubmit = async (schema) => {
    try {
      await create(formName, schema.formData);
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
