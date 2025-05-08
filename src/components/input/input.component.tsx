import React, { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { motion } from "motion/react";
import { Text } from '@radix-ui/themes'

import { InputProps } from "./input.model.ts";
import { useClickOutside } from "../../hooks";

const Input: React.FC<InputProps> = ({
  label = "",
  placeholder = "",
  control,
  name = "",
  ...inputProps
}) => {
  const { field, formState: { errors } } = useController({
    control,
    name,
  });

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLDivElement>(null);

  useClickOutside(inputRef, () => handleBlurredFocus());

  const handleFocus = () => setIsFocused(true);

  const handleBlurredFocus = () => setIsFocused(false);

  return (
    <div ref={inputRef} className="flex w-full flex-col gap-1">
      {label ? (
        <label className="text-purple-500 font-semibold">{label}</label>
      ) : null}
      <motion.div
        initial={{ borderLeftWidth: 2 }}
        animate={{ borderLeftWidth: isFocused ? 10 : 2 }}
        transition={{ duration: 0.2 }}
        className="border-[2px] w-full py-2 px-3 border-purple-500"
      >
        <input
          onFocus={handleFocus}
          value={field.value}
          onChange={field.onChange}
          className="w-full"
          {...inputProps}
        />
      </motion.div>
      {errors[name]?.message ? (
        <Text
          id="text-area-error"
          color="red"
          size="2"
        >
          {errors[name]?.message as string}
        </Text>
      ) : null}
    </div>
  );
};

export default Input;
