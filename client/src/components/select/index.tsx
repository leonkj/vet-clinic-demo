import * as React from 'react';
import ReactSelect from 'react-select';
import { object } from 'prop-types';

export type SelectOption = {
  label: string | undefined;
  value: string;
};

interface SelectProps {
  className: string;
  isClearable: boolean;
  isLoading?: boolean;
  placeholder: string;
  value: SelectOption | undefined;
  options: SelectOption[] | undefined;
  onChange: (optionValue: string | undefined) => void;
}

export const Select = (props: SelectProps) => {
  let onChange = (event: any) => {
    if (Array.isArray(event)) {
      throw new Error('Unexpected type passed to ReactSelect onChange handler');
    }
    let value;
    if (event && event.value) {
      value = event.value;
    }
    props.onChange(value);
  };

  return <ReactSelect {...props} onChange={onChange} />;
};

Select.defaultProps = {
  onChange: () => {},
};
