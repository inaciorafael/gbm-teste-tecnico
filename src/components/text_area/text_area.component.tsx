import React from "react";
import { useController } from "react-hook-form";
import {
  Text,
  TextArea as TextAreaRadix,
  TextAreaProps as TextAreaRadixProps,
} from "@radix-ui/themes";

import { TextAreaProps } from "./text_area.model.ts";

const TextArea: React.FC<TextAreaProps & TextAreaRadixProps> = ({
  control,
  name = "",
  label,
  ...textAreaProps
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
  });

  return (
    <label>
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>

      <TextAreaRadix
        size="2"
        placeholder="Descrição da carga"
        value={field.value}
        onChange={field.onChange}
        {...textAreaProps}
      />

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

export default TextArea;
