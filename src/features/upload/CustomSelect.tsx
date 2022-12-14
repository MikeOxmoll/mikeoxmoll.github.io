import { FieldProps } from "formik";
import React from "react";
import Select, {Options} from "react-select";
//import { OptionsType, ValueType } from "react-select";
import { useField } from 'formik';
interface Option {
    label: string;
    value: string;
}


interface CustomSelectType extends FieldProps {
    options: Options<Option>;
    isMulti?: boolean;
    className?: string;
    placeholder?: string;
}

export const CustomSelect = ({
 className,
 placeholder,
 field,
 form,
 options,
 isMulti = false
}: CustomSelectType) => {
    const onChange = (option: any) => {
        console.log(form)
        console.log(field)
        form.setFieldValue(
            field.name,
            isMulti
                ? (option as Option[]).map((item: Option) => item.value)
                : (option as Option).value
        );
    };

    const getValue = () => {
        console.log(form)
        console.log(field)
        if (options && field.value) {
            return isMulti
                ? options.filter(option => field.value.indexOf(option.value) >= 0)
                : options.find(option => option.value === field.value);
        } else {
            return isMulti ? [] : ("" as any);
        }
    };
    console.log(getValue())
    return (
        <Select
            className={className}
            name={field.name}
            value={getValue()}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
        />
    );
};

export default CustomSelect;
