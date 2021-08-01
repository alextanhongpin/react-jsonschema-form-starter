import { useState, useEffect } from "react";
import Form from "@rjsf/core";
import { useParams } from "react-router-dom";

import { useFetchUserForm } from "features/forms/hooks";
import { updateUser } from "features/forms/api";
import { widgets } from "features/forms/widgets";

export function UpdateUserForm() {
  const { userId } = useParams();
  const [createError, setCreateError] = useState();
  const { data, loading, error } = useFetchUserForm({
    formName: "users",
    userId,
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const formData = data?.data?.formData;
    if (formData) {
      setFormData(formData);
    }
  }, [data]);

  const handleSubmit = async (schema) => {
    try {
      await updateUser(
        {
          formName: "users",
          userId,
        },
        schema.formData
      );
    } catch (error) {
      setCreateError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const form = data?.data;
  if (!form) return null;

  return (
    <>
      {createError && JSON.stringify(createError)}
      <Form
        schema={form.schema}
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
