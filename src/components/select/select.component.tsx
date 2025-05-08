import React from "react";
import { useController } from "react-hook-form";
import { Text, Select as SelectRadix } from "@radix-ui/themes";

import { SelectOption, SelectProps } from "./select.model.ts";

const Select: React.FC<SelectProps> = ({
  control,
  name = "",
  label = "",
  options = [],
}) => {
  const { field, formState: { errors } } = useController({
    control,
    name,
  });

  return (
    <label className="w-full">
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>
      <SelectRadix.Root
        value={field.value}
        onValueChange={field.onChange}
        defaultValue=""
      >
        <SelectRadix.Trigger style={{ width: "100%" }} placeholder="Tipo" />
        <SelectRadix.Content>
          <SelectRadix.Group>
            <SelectRadix.Label>{label}</SelectRadix.Label>
            {options.length > 0
              ? options.map((option: SelectOption) => (
                  <SelectRadix.Item key={option.label} value={option.value}>
                    {option.label}
                  </SelectRadix.Item>
                ))
              : null}
          </SelectRadix.Group>
        </SelectRadix.Content>
      </SelectRadix.Root>

      {errors[name]?.message ? (
        <Text
          id="text-area-error"
          color="red"
          size="2"
        >
          {errors[name]?.message as string}
        </Text>
      ) : null}
    </label>
  );
};

export default Select;
