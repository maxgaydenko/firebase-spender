import React from "react";
import NumberFormat from "react-number-format";

interface IProps {
 inputRef: (instance: NumberFormat | null) => void
 onChange: (event: { target: { name: string; value: string } }) => void
 name: string
 suffix: string
 thousandSeparator: string
}

export const PriceInput: React.FC<IProps> = (props: IProps) => {
 const {inputRef, onChange, ...other} = props;
 const thousandSeparator = props.thousandSeparator || " ";
 const suffix = props.suffix || " ₽";

 return (
  <NumberFormat {...other}
                getInputRef={inputRef}
                onValueChange={(values) => {
                 onChange({
                  target: {
                   name: props.name,
                   value: values.value,
                  },
                 });
                }}
                isNumericString
                thousandSeparator={thousandSeparator}
                suffix={suffix}
  />
 );
}