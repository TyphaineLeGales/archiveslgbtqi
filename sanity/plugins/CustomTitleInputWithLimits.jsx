import React, { useCallback } from "react";
import { set, unset } from "sanity";
import { Stack, Text, TextArea } from "@sanity/ui";

export default function CustomTitleInputWithLimits(props) {
  const { onChange, value = "", elementProps } = props;
  const handleChange = useCallback(
    (event) =>
      onChange(
        event.currentTarget.value ? set(event.currentTarget.value) : unset(),
      ),
    [onChange],
  );
  return (
    <Stack space={3}>
      <TextArea
        {...elementProps}
        padding={4}
        value={value}
        onChange={handleChange}
      />
      <Text size={1}>{value.length || 0} / 35 Lettres</Text>
    </Stack>
  );
}
