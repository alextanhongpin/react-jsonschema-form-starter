import { useState, useEffect } from "react";
import Handlebars from "handlebars";
import jsonata from "jsonata";
import AsyncSelect from "react-select/async";
import { baseUrl, fetcher } from "ports/api";

function template(body, data) {
  const template = Handlebars.compile(body);
  return template(data);
}

export const SearchDropdown = (props) => {
  const [defaultValue, setDefaultValue] = useState();

  useEffect(() => {
    if (props.value === undefined) return;
    // Do not fetch once default value has been preloaded.
    if (defaultValue) return;

    async function prefetchOption() {
      try {
        const { optionsForApi } = props.uiSchema["ui:options"];
        const url = template(optionsForApi.prefetchUrl, { value: props.value });
        const data = await fetcher(baseUrl(url));
        const result = jsonata(optionsForApi.prefetchTransform).evaluate(data);
        setDefaultValue(result);
      } catch (error) {
        console.error(error);
      }
    }

    prefetchOption();
  }, [props.value, props.uiSchema, defaultValue]);

  const loadOptions = async (value) => {
    try {
      const { optionsForApi } = props.uiSchema["ui:options"];
      const url = template(optionsForApi.url, { value });
      const data = await fetcher(baseUrl(url));
      const result = jsonata(optionsForApi.transform).evaluate(data);

      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const handleChange = (selectedOption) => {
    props.onChange(selectedOption.value);
  };

  if (props.value !== undefined && defaultValue === undefined) return null;
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      defaultValue={defaultValue}
      loadOptions={loadOptions}
      onChange={handleChange}
    />
  );
};
